import { LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/sessions.server";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);
  return { userId };
};

export default function AuthTest() {
  const loaderData = useLoaderData<Promise<any> | undefined>();
  console.log(loaderData);

  return loaderData?.userId ? <div>You are logged in</div> : <div>Error</div>;
}
