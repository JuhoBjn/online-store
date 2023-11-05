/* eslint-disable no-undef */
const supertest = require("supertest");
const {
  describe,
  it,
  expect,
  afterEach,
  beforeAll,
  afterAll,
  jest
} = require("@jest/globals");
const bcrypt = require("bcryptjs");

const { app } = require("../app");
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
    expect(response2.body.message).toEqual(
      "A user with this email already exists"
    );
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
    expect(response.body.message).toEqual('"email" is not allowed to be empty');
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
    expect(response.body.message).toEqual('"email" is required');
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
    expect(response.body.message).toEqual(
      '"password" is not allowed to be empty'
    );
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
    expect(response.body.message).toEqual('"password" is required');
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
  const testUserPassword = "Tommy@test123";

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
      password: testUserPassword
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
    expect(response.body.phone).toEqual(testUser.phone);
    expect(response.body.premium).toEqual(testUser.premium);
    expect(response.body.token).toBeTruthy();
  });

  it("should not allow a user to log in with an invalid password", async () => {
    const testCredentials = {
      email: testUser.email,
      password: "wrongP4ssword"
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe(
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
    expect(response.body.message).toBe("No user exists for given email");
  });

  it("should not allow a user to login with empty email address", async () => {
    const testCredentials = {
      email: "",
      password: testUserPassword
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"email" is not allowed to be empty');
  });

  it("should not accept a request with no email field", async () => {
    const testCredentials = {
      password: testUserPassword
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"email" is required');
  });

  it("should not allow a user to log in with empty password", async () => {
    const testCredentials = {
      email: testUser.email,
      password: ""
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"password" is not allowed to be empty');
  });

  it("should not accept a request with no password field", async () => {
    const testCredentials = {
      email: testUser.email
    };

    const response = await supertest(app)
      .post("/api/users/login")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testCredentials);

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('"password" is required');
  });
});

const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/verifyToken");

describe("Verify token middleware", () => {
  it("should allow request if the request contains a valid token", () => {
    const payload = {
      id: "3ecdb73e-5f82-4f7f-b3d5-0c3ef2add945",
      role_id: 1
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
    const req = { headers: { authorization: `Bearer ${token}` }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should add users role ID contained in a valid token", () => {
    const payload = {
      id: "fd5c3c32-c346-41ec-9456-fa70b99120ca",
      role_id: 1
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
    const req = { headers: { authorization: `Bearer ${token}` }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user?.role_id).toEqual(1);
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

    verifyToken(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Authentication failed" });
  });

  it("should return an error when token provided in the request is empty", () => {
    const token = "";
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    verifyToken(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Authentication failed" });
  });

  it("should return an error when no token is provided in the request", () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    verifyToken(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Authentication failed" });
  });

  it("should call next() if the request method is OPTIONS", () => {
    const req = { method: "OPTIONS" };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    verifyToken(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

const checkCaretaker = require("../middleware/checkCaretaker");

describe("The user caretaker role checking middleware", () => {
  it("should call next if the user is a caretaker", () => {
    const req = { user: { role_id: 2 } };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    checkCaretaker(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should call next if the user is an administrator", () => {
    const req = { user: { role_id: 3 } };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    checkCaretaker(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("shoud return an error if the user is not a caretaker", () => {
    const req = { user: { role_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkCaretaker(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Insufficient account role" });
    expect(next).not.toBeCalled();
  });

  it("should return an error if no role ID is provided", () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkCaretaker(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "No role ID was provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if the request method is OPTIONS", () => {
    const req = { method: "OPTIONS" };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    checkCaretaker(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

const checkAdministrator = require("../middleware/checkAdministrator");

describe("The user administrator role checking middleware", () => {
  it("should call next if the user is an administrator", () => {
    const req = { user: { role_id: 3 } };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    checkAdministrator(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return an error if the user is a caretaker", () => {
    const req = { user: { role_id: 2 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkAdministrator(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Insufficient account role" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return an error if the user is a normal user", () => {
    const req = { user: { role_id: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkAdministrator(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "Insufficient account role" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should return an error if no role ID is provided", () => {
    const req = { body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkAdministrator(req, res, next);

    expect(res.status).toBeCalledWith(401);
    expect(res.send).toBeCalledWith({ message: "No role ID was provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() when the request method is OPTIONS", () => {
    const req = { method: "OPTIONS" };
    const res = {};
    const next = jest.fn(() => {
      return true;
    });

    checkAdministrator(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

const checkPremium = require("../middleware/checkPremium");

describe("The user premium account checking middleware", () => {
  it("should call next if the user has a premium account", () => {
    const payload = {
      id: "d03ffbe3-8cae-4788-90ce-8f622a5ca0de",
      role_id: 1,
      premium: true
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkPremium(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should call next if the request method is OPTIONS", () => {
    const req = { method: "OPTIONS" };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkPremium(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should return an error if the user does not have a premium account", () => {
    const payload = {
      id: "d03ffbe3-8cae-4788-90ce-8f622a5ca0de",
      role_id: 1,
      premium: false
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "7d" });
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn().mockReturnThis()
    };
    const next = jest.fn(() => {
      return true;
    });

    checkPremium(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toBeCalledWith(403);
    expect(res.send).toBeCalledWith({
      message: "This functionality is reserved for premium users"
    });
  });
});
