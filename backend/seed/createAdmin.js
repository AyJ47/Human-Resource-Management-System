const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("123456", 10);

      await User.create({
        name: "Admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Default admin created: admin@gmail.com / 123456");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.log("❌ Error creating admin:", error.message);
  }
};

module.exports = createAdmin;