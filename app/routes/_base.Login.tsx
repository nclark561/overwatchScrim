import { useState } from "react";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { ActionFunction, MetaFunction } from "@remix-run/node";
import { login, createUserSession, register } from "~/utils/sessions.server";
import { PrismaClient } from "@prisma/client";

type ActionData = {
  formError?: string;
  fieldErrors?: {
    username: string | undefined;
    password: string | undefined;
  };
  fields?: {
    loginType: string;
    username: string;
    password: string;
    repass: string;
  };
};

export const meta: MetaFunction = () => {
  return [
    { title: "Scrims Overwatch" },
    {
      name: "description",
      content: "Login to start your matches!",
    },
  ];
};

export const action: ActionFunction = async ({
  request,
}): Promise<Response | ActionData> => {
  let form = await request.formData();
  let loginType = form.get("loginType");
  let username = form.get("username");
  let password = form.get("password");
  let repass = form.get("repass") || "";
  let redirectTo = form.get("redirectTo") || "/";

  const prisma = new PrismaClient();

  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof repass !== "string" ||
    typeof redirectTo !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { loginType, username, password, repass };
  switch (loginType) {
    case "login":
      const user = await login({ username, password });
      console.log(user);
      if (!user) {
        console.log("failure to login");
        return { fields, formError: "incorrect username or password" };
      }
      return createUserSession(user.id, redirectTo);
    case "register":
      if (password !== repass) return { formError: "password confirmation does not match" };
      const userAlready = await prisma.user.findUnique({ where: { username } });
      await prisma.$disconnect();
      if (userAlready) return { formError: "user already exists" };
      const newUser = await register(username, password);
      if (!newUser) return { fields, formError: "error creating account" };
      return createUserSession(newUser.id, redirectTo);
    default:
      return { formError: "login type invalid" };
  }
};

export default function Login() {
  const [register, setRegister] = useState(false);
  const actionData = useActionData<ActionData | undefined>();
  const [searchParams] = useSearchParams();
  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRegister((prev) => !prev);
  };
  return (
    <div>
      <Form method="POST" preventScrollReset>
        <h1>{register ? "Register" : "Login"}</h1>
        <label htmlFor="username-in">username:</label>
        <input
          type="text"
          id="username-in"
          name="username"
          defaultValue={actionData?.fields?.username}
        />
        <label htmlFor="password-in">password:</label>
        <input
          type="text"
          id="password-in"
          name="password"
          defaultValue={actionData?.fields?.password}
        />
        {register && (
          <>
            <label htmlFor="repass-in">confirm password:</label>
            <input
              type="text"
              id="repass-in"
              name="repass"
              defaultValue={actionData?.fields?.repass}
            />
          </>
        )}
        <input
          type="hidden"
          name="loginType"
          value={register ? "register" : "login"}
        />
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get("redirectTo") ?? undefined}
        />
        <button onClick={handleClick}>
          {register
            ? "already have an account? click here"
            : "not registered yet? click here"}
        </button>
        <input type="submit" />
      </Form>
    </div>
  );
}
