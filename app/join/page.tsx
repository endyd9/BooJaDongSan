"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

interface JoinForm {
  email: string;
  pass: string;
  nick: string;
  addr?: string;
}

export default function Join() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm>();

  const router = useRouter();

  const onSubmit = async (joinForm: JoinForm) => {
    try {
      const { data } = await axios.post("/api/join", joinForm);

      if (data.error === "이미 가입된 이메일 입니다.") {
        alert(data.error);
        return;
      }
      if (data.error === "가입에 실패했습니다. 잠시 후 다시 시도해 주세요.") {
        alert(data.error);
        return location.reload();
      }
      alert("가입되었습니다.");
      return router.push("login");
    } catch (error) {
      alert("가입에 실패했습니다. 잠시 후 다시 시도해 주세요.");
      return location.reload();
    }
  };
  return (
    <main className="h-screen flex flex-col items-center justify-center pb-10">
      <h1 className="mx-10 text-3xl bg-white font-extralight">Join</h1>
      <hr className="mt-3 w-64 border-gray-400" />
      <p className=" before:content-['*'] before:text-blue-400 mt-3 text-sm font-bold">
        표시는 필수 필드입니다.
      </p>
      <br />

      <form className="grid w-52" onSubmit={handleSubmit(onSubmit)}>
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
          {...register("email", {
            required: "이메일을 입력해 주세요",
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: "이메일 형식을 다시 확인해 주세요",
            },
          })}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.email?.message}
        </span>
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
          {...register("pass", {
            required: "비밀번호를 입력해 주세요",
            pattern: {
              value: /(?=.*\d)(?=.*[a-z, A-Z]).{8,}/g,
              message: "영문 대,소문자,숫자 를 포함한 8자리 이상으로 해주세요",
            },
          })}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.pass?.message}
        </span>
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
          {...register("nick", { required: "닉네임을 입력해 주세요" })}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.nick?.message}
        </span>
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
    </main>
  );
}
