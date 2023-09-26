import { logout } from "~/utils/sessions.server"
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => logout(request)

export const loader: LoaderFunction = async () => redirect('/')