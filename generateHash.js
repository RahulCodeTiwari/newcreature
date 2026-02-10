import bcrypt from "bcryptjs";

const generateHash = async () => {
  try {
    const password = "123456"; // aapka admin password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);
  } catch (err) {
    console.error(err);
  }
};

generateHash();

