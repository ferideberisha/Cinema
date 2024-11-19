const Staff = require("../../models/staffModel");
const { staff_get } = require("../../controller/staffController");

describe("staff_get", () => {
  it("should get staff data by ID", async () => {
    const req = {
      params: { id: "646a777edcd947c6aa033832" },
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };

    const staffData = {
      _id: "646a777edcd947c6aa033832",
      firstname: "Feride",
      lastname: "Berisha",
      email: "feride@staff.com",
      isAdmin: true,
    };

    Staff.findById = jest.fn().mockResolvedValueOnce(staffData);

    await staff_get(req, res);

    expect(Staff.findById).toHaveBeenCalledWith("646a777edcd947c6aa033832");
    expect(res.json).toHaveBeenCalledWith(staffData);
  });
});
