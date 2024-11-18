const Staff = require("../../models/staffModel");
const { staff_delete } = require("../../controller/staffController");

describe("staff_delete", () => {
  it("should delete staff successfully", async () => {
    const req = {
      params: { id: "646e6a9e444962fc3a0f6373" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    Staff.deleteOne = jest.fn().mockResolvedValueOnce({});

    await staff_delete(req, res);

    expect(Staff.deleteOne).toHaveBeenCalledWith({
      _id: "646e6a9e444962fc3a0f6373",
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Staff deleted" });
  });
});
