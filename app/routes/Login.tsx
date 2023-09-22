import { useState } from "react";

export default function Login() {
  const [register, setRegister] = useState(false);
  const handleClick = (evt: React.SyntheticEvent) => {
    evt.preventDefault()
    setRegister(prev => !prev)
  }
  return (
    <div>
      <form>
        <h1>{register ? "Register" : "Login"}</h1>
        <label htmlFor="username-in">username:</label>
        <input id="username-in" />
        <label htmlFor="password-in">password:</label>
        <input id="password-in" />
        {register && (
          <>
            <label htmlFor="repass-in">confirm password:</label>
            <input id="repass-in" />
          </>
        )}
        <button onClick={handleClick}>{register ? 'already have an account? click here' : 'not registered yet? click here'}</button>
      </form>
    </div>
  );
}
