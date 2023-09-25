import { LoaderFunction, redirect } from "@remix-run/node";
import { requireUserId } from "~/utils/sessions.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const { userId, redirectTo }  = await requireUserId(request);
  if (!userId) {
    const params = new URLSearchParams([["redirectTo", redirectTo]])
    return redirect(`/login?${params}`)
  }
  return { userId };
};

export default function AuthTest() {
  const loaderData = useLoaderData<Promise<any> | undefined>();
  console.log(loaderData);

  return loaderData?.userId ? <div>You are logged in</div> : <div>Error</div>;
}
