const User = require("../../models/userModel");
const { user_delete } = require("../../controller/userController");

describe("user_delete", () => {
  it("should delete a user successfully", async () => {
    const req = { params: { id: "647bf76eeadd5d084c7a3ee4" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    User.deleteOne = jest.fn().mockResolvedValueOnce({});

    await user_delete(req, res);

    expect(User.deleteOne).toHaveBeenCalledWith({
      _id: "647bf76eeadd5d084c7a3ee4",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "user deleted" });
  });
});
