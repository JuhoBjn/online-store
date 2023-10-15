const {
  describe,
  expect,
  beforeEach,
  afterEach,
  it
} = require("@jest/globals");
const MailDev = require("maildev");
const app = require("../app");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const users = require("../models/users");

const waitMailDevShutdown = (maildev) => {
  return new Promise((resolve) => {
    maildev.close(() => resolve());
  });
};

describe("Password reset", () => {
  describe("password reset email", () => {
    let maildev;

    beforeEach((done) => {
      maildev = new MailDev({
        smtp: process.env.EMAIL_SMTP_PORT,
        silent: true,
        disableWeb: true
      });

      maildev.listen(done); // start mailserver
    });

    afterEach(async () => {
      // stop mailserver after each test, so tests do not conflict
      await waitMailDevShutdown(maildev);
    });

    it("should send an email for existing users", async () => {
      const res = await request(app)
        .post("/api/password-reset/send-reset-email")
        .send({
          email: "lottas@test.com"
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("message", "Reset password email sent");

      return new Promise((resolve, reject) => {
        maildev.on("new", (email) => {
          try {
            expect(email.subject).toEqual("Password Reset");
            expect(email.to[0].address).toEqual("lottas@test.com"); // check receiver email address
            expect(email.text).toMatch(/\/reset-password#ey/); // check for token link in email
          } catch (error) {
            reject(error);
          }
          resolve();
        });
      });
    });

    it("should not send an email if the user does not exist", async () => {
      const res = await request(app)
        .post("/api/password-reset/send-reset-email")
        .send({
          email: "does.not.exist@test.example.com"
        });

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty(
        "error",
        "User with that email does not exist"
      );

      return new Promise((resolve, reject) => {
        // wait for 1 second to see if an email is sent
        setTimeout(() => {
          resolve();
        }, 1000);

        maildev.on("new", (email) => {
          try {
            expect(email.subject).not.toEqual("Password Reset");
            expect(email.to[0].address).not.toEqual("jane.doe@example.com"); // check receiver email address
            expect(email.text).not.toMatch(/\/reset-password#ey/); // check for token link in email
          } catch (error) {
            reject(error);
          }
          resolve();
        });
      });
    });

    it("should error on invalid email", async () => {
      const res = await request(app)
        .post("/api/password-reset/send-reset-email")
        .send({
          email: "example.com" // missing at-sign
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty("error", '"email" must be a valid email');
    });
  });

  describe("POST set-new-password", () => {
    let user = {
      id: "41284e8d-ee2b-4e15-b9af-296de2a9af8a" // Adam Administrator (test data)
    };
    let token = jwt.sign(
      { id: user.id },
      process.env.JWT_KEY,
      { expiresIn: "30m" } // token expires in 30 minutes
    );

    it("should let you set a new password with a valid password reset token", async () => {
      const passwordHashBefore = await users
        .findById(user.id)
        .then((user) => user.password);

      const res = await request(app)
        .post("/api/password-reset/set-new-password")
        .send({
          token: token,
          password: "testPassw0rd" // new password (same as old password for testing)
        });

      expect(res.statusCode).toEqual(204);
      expect(res.body).toEqual({});

      const passwordHashAfter = await users
        .findById(user.id)
        .then((user) => user.password);

      expect(passwordHashBefore).not.toEqual(passwordHashAfter);
    });

    it("should not let you set a new password with an invalid password reset token", async () => {
      const res = await request(app)
        .post("/api/password-reset/set-new-password")
        .send({
          token: "invalid-token",
          password: "testPassw0rd" // new password (same as old password for testing)
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("error", "Unauthorized");
    });

    it("should not let you set a new password with an expired password reset token", async () => {
      // generate token with a expiration date in the past.
      const oldToken = jwt.sign(
        {
          id: "8ebf4f42-27f7-4669-ba49-a6c64bd1889f",
          exp: 10
        },
        process.env.JWT_KEY
      );

      const res = await request(app)
        .post("/api/password-reset/set-new-password")
        .send({
          token: oldToken, // expired token
          password: "testPassw0rd" // new password (same as old password for testing)
        });

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty("error", "Token expired");
    });

    it("should not let you set a new password with an empty password", async () => {
      const res = await request(app)
        .post("/api/password-reset/set-new-password")
        .send({
          token: token,
          password: ""
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        '"password" is not allowed to be empty'
      );
    });

    it("should not let you set a new password with a password that is too short", async () => {
      const res = await request(app)
        .post("/api/password-reset/set-new-password")
        .send({
          token: token,
          password: "short" // minimum password length is 8 characters
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty(
        "error",
        '"password" length must be at least 8 characters long'
      );
    });
  });
});
