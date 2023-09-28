const supertest = require("supertest");
const {
  describe,
  it,
  expect,
  afterEach,
  beforeAll,
  afterAll
} = require("@jest/globals");
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");

const app = require("../app");
const { pool } = require("../db/pool");

describe("User signup endpoint", () => {
  let createdTestAccount;

  afterEach(() => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) return reject(error);
        // Delete only accounts made by the test suite.
        const deleteQuery = "DELETE FROM users WHERE id = ?;";
        connection.query(
          deleteQuery,
          [createdTestAccount],
          (error, response) => {
            connection.release();
            if (error) return reject(error);
            resolve(response);
          }
        );
      });
    });
  });

  it("should allow a user to sign up with valid credentials", async () => {
    const testUser = {
      email: "test@user.com",
      password: "Test@user123"
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBeTruthy();
    expect(response.body.email).toBeTruthy();
    expect(response.body.token).toBeTruthy();
    createdTestAccount = response.body.id;
  });

  it("should not allow creation of two users with the same email", async () => {
    const testUser = {
      email: "test2@user.com",
      password: "Test@user123"
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    const response2 = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(201);
    expect(response2.status).toEqual(400);
    expect(response2.text).toEqual("A user with this email already exists");
    createdTestAccount = response.body.id;
  });

  it("should not allow a user to sign up without an email", async () => {
    const testUser = {
      email: "",
      password: "Test@user123"
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(400);
    expect(response.text).toEqual('"email" is not allowed to be empty');
  });

  it("should not accept request without email field", async () => {
    const testUser = {
      password: "Test@user123"
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(400);
    expect(response.text).toEqual('"email" is required');
  });

  it("should not allow a user to sign up without a password", async () => {
    const testUser = {
      email: "test@user.com",
      password: ""
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(400);
    expect(response.text).toEqual('"password" is not allowed to be empty');
  });

  it("should not accept request without password field", async () => {
    const testUser = {
      email: "test@user.com"
    };

    const response = await supertest(app)
      .post("/api/users/signup")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toEqual(400);
    expect(response.text).toEqual('"password" is required');
  });
});

describe("User login endpoint", () => {
  const testUser = {
    id: "7997f9f8-b006-4cde-a1b1-18dcb4aafea9",
    role_id: 1,
    first_name: "Tommy",
    last_name: "Tester",
    email: "tommy@tester.com",
    postal_code: "00100",
    city: "Helsinki",
    country: "fi",
    last_location_latitude: 60.167498,
    last_location_longitude: 24.929831,
    phone: "0123456789",
    password: "Tommy@test123",
    premium: 1
  };
  const testUserRole = "user";

  beforeAll(() => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(testUser.password, 12, (error, hash) => {
        if (error) return reject(error);
        testUser.password = hash;

        pool.getConnection((error, connection) => {
          if (error) return reject(error);
          const insertQuery = "INSERT INTO `users` SET ?;";
          connection.query(insertQuery, [testUser], (error, result) => {
            connection.release();
            if (error) return reject(error);
            resolve(result);
          });
        });
      });
    });
  });

  afterAll(() => {
    return new Promise((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) return reject(error);
        const deleteQuery = "DELETE FROM users WHERE id = ?;";
        connection.query(
          deleteQuery,
          ["7997f9f8-b006-4cde-a1b1-18dcb4aafea9"],
          (error, result) => {
            connection.release();
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  });

  it("should allow a user to log in with valid credentials", async () => {
    const testCredentials = {
      email: testUser.email,
      password: testUser.password
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toEqual(testUser.id);
    expect(response.body.role).toEqual(testUserRole);
    expect(response.body.firstname).toEqual(testUser.first_name);
    expect(response.body.lastname).toEqual(testUser.last_name);
    expect(response.body.email).toEqual(testUser.email);
    expect(response.body.postalcode).toEqual(testUser.postal_code);
    expect(response.body.city).toEqual(testUser.city);
    expect(response.body.country).toEqual(testUser.country);
    expect(response.body.last_location_latitude).toEqual(
      testUser.last_location_latitude
    );
    expect(response.body.last_location_longitude).toEqual(
      testUser.last_location_longitude
    );
    expect(response.body.phone).toEqual(testUser.phone);
    expect(response.body.premium).toEqual(
      Boolean.valueOf(testUser.premium && 1)
    );
    expect(response.body.token).toBeTruthy();
  });

  it("should not allow a user to login without valid credentials", async () => {
    const testCredentials = {
      email: "tommy@test.com",
      password: "wrongP4ssword"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(401);
    expect(response.text).toBe(
      "Invalid credentials. Please check email and password and try again."
    );
  });

  it("should not allow a user to log in without an account", async () => {
    const testCredentials = {
      email: "jane@doe.com",
      password: "Jane@doe123"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toEqual(401);
    expect(response.text).toBe("No user exists for given email");
  });

  it("should not allow a user to login with empty email address", async () => {
    const testCredentials = {
      email: "",
      password: "Tommy@test123"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"email" is not allowed to be empty');
  });

  it("should not accept a request with no email field", async () => {
    const testCredentials = {
      password: "Tommy@test123"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.text).toEqual('"email" is required');
  });

  it("should not allow a user to log in with empty password", async () => {
    const testCredentials = {
      email: "tommy@test.com",
      password: ""
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.text).toBe('"password" is not allowed to be empty');
  });

  it("should not accept a request with no password field", async () => {
    const testCredentials = {
      email: "tommy@test.com"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.text).toEqual('"password" is required');
  });
});
/*
const checkToken = require("../middleware/checkToken");

describe("Verify token middleware", () => {
  it("should allow request if the request contains a valid token", () => {
    const payload = {
      id: "123oiusfd",
      firstname: "Tommy",
      lastname: "Test",
      email: "tommy@test.com"
    };
    const token = jwt.sign(payload, process.env.JWT_KEY);
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });
    checkToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return an error if the request has invalid token", () => {
    // Mock token generated on https://jwt.io
    // Header = { "alg": "HS256", "typ": "JWT" }
    // Payload = { "sub": "1234567890", "name: "John Doe", "iat": "1516239022" }
    // Verify Signature = { HMACSHA256(base64UrlEncode(header) + "." +base64UrlEncode(payload), "super-secret-hehe")}
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Kw6H3veC_nvZTyqf0xRiizlbY4ZO1vfwmCSVzxiPSKM";
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });
    checkToken(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith("Authentication failed");
  });

  it("should return an error when no token is provided in the request", () => {
    const token = "";
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });
    checkToken(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith("Authentication failed");
  });
});
*/
