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

const app = require("../app");
const { pool } = require("../db/pool");

describe("User login endpoint", () => {
  const testUser = {
    id: "7997f9f8-b006-4cde-a1b1-18dcb4aafea8",
    role_id: 1,
    first_name: "Tommy1",
    last_name: "Tester1",
    email: "tommy@tester1.com",
    postal_code: "00104",
    city: "Helsinkii",
    country: "se",
    last_location_latitude: 60.167498,
    last_location_longitude: 24.929831,
    phone: "01234567894",
    password: "Tommy@test1234",
    premium: 1
  };

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
          ["7997f9f8-b006-4cde-a1b1-18dcb4aafea8"],
          (error, result) => {
            connection.release();
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    });
  });

  it("Should allow user change name", async () => {
    const testUser = {
      id: "7997f9f8-b006-4cde-a1b1-18dcb4aafea8",
      role_id: 1,
      first_name: "Tommy1111",
      last_name: "Tester"
    };
    const response = await supertest(app)
      .patch("/api/users/updateuser")
      .set("Accept", "application/json")
      .set("Content", "application/json")
      .send(testUser);

    expect(response.status).toBe(200);
  }, 1000000000);
});
