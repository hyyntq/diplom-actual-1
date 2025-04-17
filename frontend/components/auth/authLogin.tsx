"use client";

import { PrevStateLogin } from "@/lib/interface";
import FormLink from "@/components/ui/FormLink";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { loginAction } from "@/data/auth-actions";
import SubmitButton from "./SubmitButton";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const initialState: PrevStateLogin = {
  ZodError: null,
  strapiError: null,
  message: null,
};

export default function Login() {
  const [state, formAction] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.message === "Регистрация успешна! Добро пожаловать!") {
      toast(`Successful Login`, {
        action: {
          label: "Ok",
          onClick: () => console.log("undo"),
        },
      });
      setTimeout(() => redirect("/"), 1000); 
    }
  }, [state.message]);

  return (
    <div className="max-w-md w-full bg-stone-800 py-12 px-13 text-zinc-300 rounded-xl shadow-xl">
      <form action={formAction} className="flex flex-col gap-10">
        <FormLink />
        <div className="flex flex-col gap-6 mt-2">
          <div className="">
            <label htmlFor="identifier" className="auth-label">
              Login
            </label>
            <input
              type="text"
              className="input"
              placeholder="username or email"
              id="identifier"
              name="identifier"
            />
            {state.ZodError?.identifier && (
              <p className="text-red-500 text-sm mt-1">
                {state.ZodError.identifier[0]}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              type="password"
              className="input"
              placeholder="password"
              id="password"
              name="password"
            />
            {state.ZodError?.password && (
              <p className="text-red-500 text-sm mt-1">
                {state.ZodError.password[0]}
              </p>
            )}
          </div>
        </div>

        {state.strapiError && (
          <p className="text-red-500 text-sm text-center">
            {state.strapiError}
          </p>
        )}

        <div className="divider" />

        <div className="text-center p-3 rounded-xl cursor-pointer transition bg-stone-400 text-stone-200 hover:opacity-80 duration-300">
          <SubmitButton
            text="Login"
            className="cursor-pointer uppercase font-bold text-xl"
          />
        </div>
      </form>
      <div className="text-end mt-5">
        <Link
          href="/forgotPassword"
          className="text-gray-200 underline hover:text-stone-400 transition"
        >
          Forgot Password?
        </Link>
      </div>
    </div>
  );
}
