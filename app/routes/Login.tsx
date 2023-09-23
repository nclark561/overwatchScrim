import { useState } from "react";
import { login } from "~/utils/sessions.server";

type UserForm = {
  username: string;
  password: string;
  repass: string;
};

export default function Login() {
  const [register, setRegister] = useState(false);
  const [form, setForm] = useState<Partial<UserForm>>({});
  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRegister((prev) => !prev);
  };
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return {
        ...prev,
        [evt.target.name]: evt.target.value,
      };
    });
  };
  return (
    <div>
      <form>
        <h1>{register ? "Register" : "Login"}</h1>
        <label htmlFor="username-in">username:</label>
        <input id="username-in" name="username" onChange={handleChange} />
        <label htmlFor="password-in">password:</label>
        <input id="password-in" name="password" onChange={handleChange} />
        {register && (
          <>
            <label htmlFor="repass-in">confirm password:</label>
            <input id="repass-in" name="repass" onChange={handleChange} />
          </>
        )}
        <button onClick={handleClick}>
          {register
            ? "already have an account? click here"
            : "not registered yet? click here"}
        </button>
      </form>
    </div>
  );
}
