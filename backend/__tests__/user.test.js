const supertest = require("supertest");
const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const bcrypt = require("bcryptjs");

const app = require("../app");
const { pool } = require("../db/pool");

const jwt = require("jsonwebtoken");

describe("all profile updating", () => {
  let user = {
    id: "e07689a6-e43b-4f07-9331-782fa4f5decf"
  };
  let token = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
    expiresIn: "30m"
  });
  const testUser1 = {
    id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
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
    id: "ae6c9a1d-5dd7-440f-ac4e-c7c43806c879",
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
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        first_name: "John"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user last name", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        last_name: "Jhonson"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user email", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        email: "tommy1@tester1.com"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user postal code", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        postal_code: "64958"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user city", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        city: "Stockholm"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user country", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        country: "S"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(200);
  });
  it("Should update user phone number", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "e07689a6-e43b-4f07-9331-782fa4f5decf",
        phone: "654987321"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    console.log(response.body);
    expect(response.status).toEqual(200);
  });

  it("Should NOT update other user name", async () => {
    const response = await supertest(app)
      .post("/api/users/updateUser")
      .send({
        id: "ae6c9a1d-5dd7-440f-ac4e-c7c43806c879",
        name: "Jorma"
      })
      .set("Authorization", `Bearer ${token}`)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");
    expect(response.status).toEqual(403);
  });
});
