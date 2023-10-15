const { describe, it, expect } = require("@jest/globals");
const supertest = require("supertest");
const express = require("express");
const app = express();
const bcrypt = require("bcryptjs");
const app = require("../app");
const { pool } = require("../db/pool");

describe("User creating point", () => {
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
    }
    
    );
    

   it("Should allow user change name", async () => {
    const testUser = {
      id: "7997f9f8-b006-4cde-a1b1-18dcb4aafea9",
      role_id: 1,
      first_name: "Tommy1111",
      last_name: "Tester",
      email: ""
   }
   const response = await supertest(app)
    .post("/api/users/updateUser")
    .set("Accept", "application/json") 
    .set("Content", "application/json")
    .send(testUser);

    expect(response.status).toBe(200); 
   });
});
