const { describe, it, expect } = require("@jest/globals");
const supertest = require("supertest");
const express = require('express');
const app = express();

describe("update user name", () => {
    it("should create user", async () => {
        const response = await supertest(app).post("/create").send({
        id: "123456789",
        firstname: "John",
        lastname: "Doe",
        postalcode: "12345",
        city: "Stockholm",
        country: "Sweden",
        phone: "0701234567",
        premium: false
        });
    
        expect(response.status).toEqual(200);
    });
    it("Should update user name", async () => {
        const response = await supertest(app).post("/updateUser").send({
        id: "123456789",
        firstname: "John1111"
        });
    
        expect(response.status).toEqual(200);
    });
});