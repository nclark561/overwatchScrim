import { useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import { login } from "~/utils/sessions.server";

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

export const action: ActionFunction = async ({
  request,
}) /*: Promise<Response | ActionData>*/ => {
  let form = await request.formData();
  let loginType = form.get("loginType");
  let username = form.get("username");
  let password = form.get("password");
  let repass = form.get("repass");

  if (
    typeof loginType !== "string" ||
    typeof username !== "string" ||
    typeof password !== "string" ||
    typeof repass !== "string"
  ) {
    return { formError: `Form not submitted correctly.` };
  }

  let fields = { loginType, username, password, repass };
  switch (loginType) {
    case "login":
      console.log(form.get("username"), form.get("password"));
      const user = await login({ username, password });
      return fields;
    case "register":
      console.log(username, password, repass);
      return fields;
    default:
      return { formError: "login type invalid" };
  }
};

export default function Login() {
  const [register, setRegister] = useState(false);
  const actionData = useActionData<ActionData | undefined>();
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
