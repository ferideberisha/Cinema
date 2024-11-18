const User = require("../../models/userModel");
const { user_list } = require("../../controller/userController");

describe("user_list", () => {
  it("should return a list of users without id and password", async () => {
    const req = {};
    const res = {
      json: jest.fn(),
    };

    const expectedUsers = [
      {
        id: "647933e69a374a243360f082",
        firstname: "Feride",
        email: "feride@test.com",
      },
      {
        id: "647bf76eeadd5d084c7a3ee4",
        firstname: "Endrit",
        email: "endrit@test.com",
      },
    ];

    User.find = jest.fn().mockReturnValue({
      select: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValueOnce(expectedUsers),
    });

    await user_list(req, res);

    expect(User.find).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(expectedUsers);
  });
});
