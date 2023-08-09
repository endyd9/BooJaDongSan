"use client";

import axios from "axios";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  pass: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const router = useRouter();

  const onSubmit = async (loginForm: LoginForm) => {
    try {
      const { data } = await axios.post("/api/login", loginForm);

      if (data.error === undefined) {
        const { token } = data;
        setCookie("x-jwt", token);
      } else {
        return alert(data.error);
      }

      return router.push("/");
    } catch {
      alert("로그인에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return location.reload();
    }
  };
  return (
    <main className="h-screen flex flex-col items-center justify-center pb-10">
      <h1 className="mx-10 text-3xl bg-white font-extralight">Login</h1>
      <hr className="mt-3 w-64 border-gray-400" />
      <br />
      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-Mail</label>
        <input
          className="border border-gray-300"
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        <br />
        <label htmlFor="pass">Password</label>
        <input
          className="border border-gray-300"
          type="password"
          id="pass"
          {...register("pass", { required: true })}
        />
        <br />
        <input
          className="w-1/2 mx-14 bg-gray-100 hover:cursor-pointer hover:shadow-md hover:bg-gray-300 border"
          type="submit"
          value="Login"
        />
      </form>
    </main>
  );
}
