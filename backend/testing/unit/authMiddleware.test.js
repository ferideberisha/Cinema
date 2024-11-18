const jwt = require("jsonwebtoken");
const middleware = require("../../middleware/authMiddleware");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

describe("Authentication Middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      headers: {
        authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzkzM2U2OWEzNzRhMjQzMzYwZjA4MiIsImlhdCI6MTY4NTk2NTc3OSwiZXhwIjoxNzE3NTAxNzc5fQ.rfnd4vVcC2CJFBlFeK0dMe-FLgL54LgzCB3NKdIQWYQ", // Replace with a valid JWT token for testing
      },
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should set userId in req object if token is valid", () => {
    const tokenPayload = {
      id: "647933e69a374a243360f082",
    };
    const token = jwt.sign(tokenPayload, process.env.jwt_secret);

    req.headers.authorization = `Bearer ${token}`;

    middleware(req, res, next);

    expect(req.userId).toBe(tokenPayload.id);
    expect(next).toHaveBeenCalled();
  });
});
