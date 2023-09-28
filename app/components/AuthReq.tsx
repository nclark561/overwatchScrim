import { useLocation, Link } from "@remix-run/react";

export default function AuthReq() {
  const handleClick = (evt: React.FormEvent) => {
    evt.preventDefault();
    history.back();
  };
  const redirectTo = useLocation().pathname
  const params = new URLSearchParams([["redirectTo", redirectTo]])
  return (
    <div className="flex flex-col items-center">
      <p>Must be logged in to access this page.</p>
      <div className="flex">
        <button onClick={handleClick}>Go Back</button>
        <Link to={`/login?${params}`} prefetch="intent">Login Here</Link>
      </div>
    </div>
  );
}
