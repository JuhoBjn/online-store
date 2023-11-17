const supertest = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const bcrypt = require("bcryptjs");

const app = require("../app");
const { pool } = require("../db/pool");

const jwt = require("jsonwebtoken");

describe("all profile updating", () => {
  let user = {
    id: "197bdce9-f60b-4529-b781-a78fb54d7c51"
  };
  let token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
    expiresIn: "30m"
  });
  const testUser1 = {
    id: "197bdce9-f60b-4529-b781-a78fb54d7c51",
    role_id: 1,
    first_name: "Tommy",
    last_name: "Tester",
    email: "tommy@tester.com",
    postal_code: "00104",
    city: "Helsinki",
    country: "FI",
    last_location_latitude: 60.167498,
    last_location_longitude: 24.929831,
    phone: "01234567894",
    password: "Tommy@test1234",
    premium: 1
  };
  const testUser2 = {
    id: "8b414dd1-f7cb-482c-9f4a-3cfdb998f948",
    role_id: 1,
    first_name: "Tomi",
    last_name: "Testaaja",
    email: "Tomi@Testaaja.com",
    postal_code: "00200",
    city: "Tampere",
    country: "FI",
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
  it("Should update user first name", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        first_name: "John"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user last name", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        last_name: "Jhonson"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user email", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        email: "tommy1@tester1.com"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user postal code", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        postal_code: "64958"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user city", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        city: "Stockholm"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user country", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        country: "S"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user phone number", async () => {
    const response = await supertest(app)
      .patch("/api/users/197bdce9-f60b-4529-b781-a78fb54d7c51")
      .send({
        phone: "654987321"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });

  it("Should NOT update other user name", async () => {
    const response = await supertest(app)
      .patch("/api/users/8b414dd1-f7cb-482c-9f4a-3cfdb998f948")
      .send({
        first_name: "Jorma"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(403);
  });
});
