const request = require("supertest");
const app = require("../app");
const {
  describe,
  it,
  expect,
  beforeEach,
  afterEach
} = require("@jest/globals");
const { promisePool } = require("../db/pool");

describe("sendFriendRequest", () => {
  let senderUser;
  let receiverUser;

  const createUser = async (email, password) => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({ email, password });
    return { id: response.body.id, email, token: response.body.token };
  };

  beforeEach(async () => {
    // Create two users for testing.
    senderUser = await createUser("example-sender@example.com", "Password123!");
    receiverUser = await createUser(
      "example-receiver@example.com",
      "Password123!"
    );
  });

  afterEach(async () => {
    // Delete the users created for testing.
    await promisePool.query("DELETE FROM users WHERE id IN (?)", [
      [senderUser.id, receiverUser.id]
    ]);
  });

  it("should return 400 if senderUserId is not a valid UUID", async () => {
    const response = await request(app)
      .post(`/api/users/invalid-uuid/friend-requests/${receiverUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"senderUserId" must be a valid GUID');
  });

  it("should return 400 if receiverUserId is not a valid UUID", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/invalid-uuid`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('"receiverUserId" must be a valid GUID');
  });

  it("should return 401 if senderUserId does not match authenticated user", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${receiverUser.id}`)
      .set("Authorization", "Bearer invalid-token")
      .send();

    expect(response.status).toBe(401);
  });

  it("should return 400 if senderUserId and receiverUserId are the same", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${senderUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Sender and receiver cannot be the same user"
    );
  });

  it("should return 400 if receiverUserId does not exist", async () => {
    const response = await request(app)
      .post(
        `/api/users/${senderUser.id}/friend-requests/00000000-0000-0000-0000-000000000000`
      )
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "No user exists with given receiverUserId"
    );
  });

  it("should return 200 if request is valid", async () => {
    const response = await request(app)
      .post(`/api/users/${senderUser.id}/friend-requests/${receiverUser.id}`)
      .auth(senderUser.token, { type: "bearer" });

    expect(response.status).toBe(200);
  });
});
