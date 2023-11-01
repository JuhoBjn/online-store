const supertest = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const bcrypt = require("bcryptjs");

const app = require("../app");
const { pool } = require("../db/pool");

describe("all profile finding or searching by id", () => {
  const testUser1 = {
    id: "1",
    role_id: 1,
    first_name: "Tommy1",
    last_name: "Tester1",
    email: "tommy@tester1.com",
    postal_code: "00104",
    city: "Helsinkii",
    country: "FI",
    last_location_latitude: 60.167498,
    last_location_longitude: 24.929831,
    phone: "01234567894",
    password: "Tommy@test1234",
    premium: 1
  };
  const testUser2 = {
    id: "2",
    role_id: 1,
    first_name: "Tomi",
    last_name: "Testaaja",
    email: "Tomi@Testaaja.com",
    postal_code: "00200",
    city: "Tampere",
    country: "Fi",
    last_location_latitude: 61.4981,
    last_location_longitude: 23.7608,
    phone: "9876543210",
    password: "Tomi@testi1234",
    premium: 1
  };

  beforeAll(() => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(testUser1.password, 12, (error, hash) => {
        if (error) return reject(error);
        testUser1.password = hash;

        pool.getConnection((error, connection) => {
          if (error) return reject(error);
          const insertQuery = "INSERT INTO `users` SET ?;";
          connection.query(insertQuery, [testUser1], (error, result) => {
            connection.release();
            if (error) return reject(error);
            resolve(result);
          });
        });
      });
      bcrypt.hash(testUser2.password, 12, (error, hash) => {
        if (error) return reject(error);
        testUser2.password = hash;

        pool.getConnection((error, connection) => {
          if (error) return reject(error);
          const insertQuery = "INSERT INTO `users` SET ?;";
          connection.query(insertQuery, [testUser2], (error, result) => {
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
        connection.query(deleteQuery, ["1"], (error, result) => {
          connection.release();
          if (error) return reject(error);
          resolve(result);
        });
      });
      pool.getConnection((error, connection) => {
        if (error) return reject(error);
        const deleteQuery = "DELETE FROM users WHERE id = ?;";
        connection.query(deleteQuery, ["2"], (error, result) => {
          connection.release();
          if (error) return reject(error);
          resolve(result);
        });
      });
    });
  });

  it("Should find user by id", async () => {
    const response = await supertest(app)
      .get("/api/users/1")
      .set("Content", "application/json");

    expect(response.status).toBe(200);
  });
  it("Should find all users", async () => {
    const response = await supertest(app)
      .get("/api/users/AllUsers")
      .set("Content", "application/json");

    expect(response.status).toBe(200);
  });
  it("should delete user by id", async () => {
    const response = await supertest(app)
      .delete("/api/users/1")
      .set("Content", "application/json");

    expect(response.status).toBe(200);
  });
  it("Should not find deleted user", async () => {
    const response = await supertest(app)
      .get("/api/users/1")
      .set("Content", "application/json");

    expect(response.status).toBe(404);
  });
  it("Should find only 1 user", async () => {
    const response = await supertest(app)
      .get("/api/users/AllUsers")
      .set("Content", "application/json");

    expect(response.status).toBe(200);
  });
});
