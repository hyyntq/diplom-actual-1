"use server";

import {
  PrevStateRegister,
  PrevStateLogin,
  RegisterData,
  LoginData,
  StrapiAuthResponse,
} from "@/lib/interface";
import { loginService, registerService } from "@/services/auth-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const cookieConfig = {
  maxAge: 14 * 24 * 3600, 
  path: "/",
  domain: "localhost",
  httpOnly: true,
  secure: false,
};


const messages = {
  password: "Пароль должен содержать от 6 до 100 символов",
  email: "Введите корректный Email",
  emailExists: "Этот email уже зарегистрирован",
  userNotFound: "Пользователь с таким логином или email не найден",
  general: "Что-то пошло не так",
  successRegister: "Регистрация успешна! Добро пожаловать!",
  successLogin: "Вход выполнен успешно!",
};


const schemaRegister = z.object({
  username: z.string().min(1, { message: "Введите имя пользователя" }),
  email: z.string().email({ message: messages.email }),
  password: z
    .string()
    .min(6, { message: messages.password })
    .max(100, { message: messages.password }),
});

const schemaLogin = z.object({
  identifier: z.string().min(1, { message: "Введите логин или email" }),
  password: z
    .string()
    .min(6, { message: messages.password })
    .max(100, { message: messages.password }),
});


export async function registerAction(
  prevState: PrevStateRegister,
  formData: FormData
) {
  const authData = schemaRegister.safeParse({
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!authData.success) {
    return {
      ...prevState,
      ZodError: authData.error.flatten().fieldErrors,
      strapiError: null,
    };
  }

  const response: StrapiAuthResponse = await registerService(
    authData.data as RegisterData
  );

  if (!response || response.error) {
    return {
      ...prevState,
      ZodError: null,
      strapiError:
        response?.error?.message === "Email already exists"
          ? messages.emailExists
          : response?.error?.message || null,
      message: null,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, cookieConfig);
  return {
    ZodError: null,
    strapiError: null,
    message: messages.successRegister,
  };
}


export async function loginAction(
  prevState: PrevStateLogin,
  formData: FormData
) {
  const authData = schemaLogin.safeParse({
    identifier: formData.get("identifier"),
    password: formData.get("password"),
  });

  if (!authData.success) {
    return {
      ...prevState,
      ZodError: authData.error.flatten().fieldErrors,
      strapiError: null,
    };
  }

  const response: StrapiAuthResponse = await loginService(
    authData.data as LoginData
  );

  if (!response || response.error) {
    return {
      ...prevState,
      ZodError: null,
      strapiError:
        response?.error?.status === 401
          ? messages.userNotFound
          : response?.error?.message || messages.general,
      message: null,
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("jwt", response.jwt, cookieConfig);
  return { ZodError: null, strapiError: null, message: messages.successLogin }; 
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("jwt");
  redirect("/login");
}
