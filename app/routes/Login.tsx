import { useState } from "react";
import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";
import { login } from "~/utils/sessions.server";

type UserForm = {
  username: string;
  password: string;
  repass: string;
};

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
})/*: Promise<Response | ActionData>*/ => {
  let form = await request.formData()
  let loginType = form.get("loginType")
  let username = form.get("username")
  let password = form.get("password")
  let repass = form.get("repass")

  let fields = {loginType, username, password, repass}
  switch (loginType) {
    case 'login':
      console.log(form.get('username'), form.get('password'))
      return fields
    case 'register':
      console.log(form.get('username'), form.get('password'), form.get("repass"))
      return fields
    default:
      return {formError: 'login type invalid'}
  }
};

export default function Login() {
  const [register, setRegister] = useState(false);
  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRegister((prev) => !prev);
  };
  return (
    <div>
      <Form method="POST" preventScrollReset>
        <h1>{register ? "Register" : "Login"}</h1>
        <label htmlFor="username-in">username:</label>
        <input id="username-in" name="username" />
        <label htmlFor="password-in">password:</label>
        <input id="password-in" name="password" />
        {register && (
          <>
            <label htmlFor="repass-in">confirm password:</label>
            <input id="repass-in" name="repass" />
          </>
        )}
        <input type="hidden" name="loginType" value={register ? 'register' : 'login'}/>
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
