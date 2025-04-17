"use client";

import { PrevStateRegister } from "@/lib/interface";
import FormLink from "@/components/ui/FormLink";
import { registerAction } from "@/data/auth-actions";
import SubmitButton from "./SubmitButton";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const initialState: PrevStateRegister = {
  ZodError: null,
  strapiError: null,
  message: null,
};

export default function Register() {
  const [state, formAction] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (state.message === "Регистрация успешна! Добро пожаловать!") {
      toast(`Successful Register`, {
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

        <div className="flex flex-col gap-6">
          <div>
            <label htmlFor="username" className="auth-label">
              Username
            </label>
            <input
              type="text"
              className="input"
              placeholder="username"
              id="username"
              name="username"
            />
            {state.ZodError?.username && (
              <p className="text-red-500 text-sm mt-1">
                {state.ZodError.username[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              type="email"
              className="input"
              placeholder="email"
              id="email"
              name="email"
            />
            {state.ZodError?.email && (
              <p className="text-red-500 text-sm mt-1">
                {state.ZodError.email[0]}
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
            text="Register"
            className="cursor-pointer uppercase font-bold text-xl rounded-xl w-full"
          />
        </div>
      </form>
    </div>
  );
}
