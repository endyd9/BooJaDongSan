import * as jwt from "jsonwebtoken";

export const sign = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const verify = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET!);
};
