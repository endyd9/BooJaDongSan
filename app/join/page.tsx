"use client";

import axios from "axios";
import { useForm } from "react-hook-form";

interface JoinForm {
  email: string;
  pass: string;
  nick: string;
  addr?: string;
}

export default function Join() {
  const { register, handleSubmit } = useForm<JoinForm>();

  const onSubmit = async (joinForm: JoinForm) => {
    const res = await (
      await fetch("api/join", {
        method: "post",
        headers: {
          "Content-Type": `application/json`,
        },
        body: JSON.stringify(joinForm),
      })
    ).json();

    console.log(res);
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center pb-10">
      <h1 className="mx-10 text-3xl bg-white font-extralight">Join</h1>
      <hr className="mt-3 w-64 border-gray-400" />
      <p className=" before:content-['*'] before:text-blue-400 mt-3 text-sm font-bold">
        표시는 필수 필드입니다.
      </p>
      <br />

      <form className="grid" onSubmit={handleSubmit(onSubmit)}>
        <label
          className="after:content-['*'] after:text-blue-400"
          htmlFor="email"
        >
          E-Mail
        </label>
        <input
          className="border border-gray-300"
          type="email"
          id="email"
          {...register("email", { required: true })}
        />
        <br />
        <label
          className="after:content-['*'] after:text-blue-400"
          htmlFor="pass"
        >
          Password
        </label>
        <input
          className="border border-gray-300"
          type="password"
          id="pass"
          {...register("pass", { required: true })}
        />
        <br />
        <label
          className="after:content-['*'] after:text-blue-400"
          htmlFor="nick"
        >
          Nick Name
        </label>
        <input
          className="border border-gray-300"
          type="text"
          id="nick"
          {...register("nick", { required: true })}
        />
        <br />
        <label htmlFor="addr">Address</label>
        <input
          className="border border-gray-300"
          type="text"
          id="addr"
          {...register("addr")}
        />
        <br />
        <input
          className="w-1/2 mx-14 bg-gray-100 hover:cursor-pointer hover:shadow-md hover:bg-gray-300 border"
          type="submit"
          value="Join"
        />
      </form>
    </div>
  );
}
