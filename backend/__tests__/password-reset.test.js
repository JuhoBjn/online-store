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
  });
});
