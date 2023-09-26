import { LoaderFunction, redirect, MetaFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/sessions.server";
import { useLoaderData } from "@remix-run/react";
import LogoutButton from "~/components/buttons/LogoutButton";

export const meta: MetaFunction = () => {
  return [
    { title: "Scrims Overwatch" },
    {
      name: "description",
      content: "Setup scrim matches against people your rank in Overwatch 2!",
    },
  ];
};

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

  return loaderData?.userId ? <LogoutButton/> : <div>Error</div>;
}
