"use client";

import { useForm } from "react-hook-form";

interface LoginForm {
  email: string;
  pass: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>();

  const onSubmit = (loginForm: LoginForm) => {
    //로그인 요청 보낼 함수임
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center pb-10">
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
    </div>
  );
}
