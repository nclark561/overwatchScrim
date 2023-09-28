import { LoaderFunction, redirect, MetaFunction, ActionFunction } from "@remix-run/node";
import { requireUserId } from "~/utils/sessions.server";
import { useLoaderData } from "@remix-run/react";
import LogoutButton from "~/components/buttons/LogoutButton";
import AuthReq from "~/components/AuthReq";

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
  const { userId }  = await requireUserId(request);
  if (!userId) {
    return null
  }
  return { userId };
};

export default function AuthTest() {
  const loaderData = useLoaderData<Promise<any> | undefined>();

  return loaderData?.userId ? <LogoutButton/> : <AuthReq/>;
}
