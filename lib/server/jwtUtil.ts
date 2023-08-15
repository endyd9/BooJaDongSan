import * as jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET!;

export const sign = (id: string) => {
  const token = jwt.sign({ id }, secret, {
    algorithm: "HS256",
    expiresIn: "14d",
  });
  return {
    token,
  };
};

export const verify = (token: string) => {
  return jwt.verify(token, secret);
};
