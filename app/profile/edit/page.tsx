"use client";

import { UserInfoForm } from "@/app/join/page";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface UserInfoResponse {
  ok: boolean;
  user: {
    email: string;
    pass: string;
    nickName: string;
    address: string;
  };
}

export default function Edit() {
  const { data } = useSWR<UserInfoResponse>(`/api/profile/edit`);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoForm>();

  const router = useRouter();

  const onSubmit = async (editForm: UserInfoForm) => {
    try {
      const { email, pass, nick, addr } = editForm;
      if (email === "" && pass === "" && nick === "" && addr === "")
        return alert("필드를 하나 이상 채워주세요");

      const submitForm = {
        email: email === "" ? undefined : email,
        pass: pass === "" ? undefined : pass,
        nickName: nick === "" ? undefined : nick,
        address: addr === "" ? undefined : addr,
      };

      const { data } = await axios.post("/api/profile/edit", submitForm);

      if (data.ok === false) {
        throw new Error();
      }
      alert("회원정보 변경 완료");
      return router.push(`/profile/${data.id}`);
    } catch {
      return alert(
        "회원정보를 변경할 수 없습니다.\n 잠시 후 다시 시도해 주세요."
      );
    }
  };

  useEffect(() => {
    if (data?.ok === false) {
      alert("접근 권한이 없습니다.");
      router.push("/login");
    }
  }, [data]);
  return (
    <main className="h-screen flex flex-col items-center justify-center pb-10">
      <h1 className="mx-10 text-2xl bg-white font-extralight">
        회원 정보 수정
      </h1>
      <hr className="mt-3 w-64 border-gray-400" />
      <form className="grid w-52 my-5" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">E-Mail</label>
        <input
          className="border border-gray-300"
          type="email"
          id="email"
          placeholder={data?.user?.email}
          {...register("email", {
            pattern: {
              value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ || "",
              message: "이메일 형식을 다시 확인해 주세요",
            },
          })}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.email?.message}
        </span>
        <label htmlFor="pass">Password</label>
        <input
          className="border border-gray-300"
          type="password"
          id="pass"
          placeholder="********"
          {...register("pass", {
            pattern: {
              value: /(?=.*\d)(?=.*[a-z, A-Z]).{8,}/g || "",
              message: "영문 대,소문자,숫자 를 포함한 8자리 이상으로 해주세요",
            },
          })}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.pass?.message}
        </span>
        <label htmlFor="nick">Nick Name</label>
        <input
          className="border border-gray-300"
          type="text"
          id="nick"
          placeholder={data?.user?.nickName}
          {...register("nick")}
        />
        <span className="my-3 text-xs text-red-600">
          {errors.nick?.message}
        </span>
        <label htmlFor="addr">Address</label>
        <input
          className="border border-gray-300"
          type="text"
          id="addr"
          placeholder={data?.user?.address}
          {...register("addr")}
        />
        <br />
        <input
          className="w-1/2 mx-14 bg-gray-100 hover:cursor-pointer hover:shadow-md hover:bg-gray-300 border"
          type="submit"
          value="Save"
        />
      </form>
    </main>
  );
}
