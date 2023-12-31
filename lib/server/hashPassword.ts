import bcrypt from "bcrypt";

export const hashing = async (pass: string) => {
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  return await bcrypt.hash(pass, salt);
};

export const compare = async (pass1: string, pass2: string) => {
  return await bcrypt.compare(pass1, pass2);
};
