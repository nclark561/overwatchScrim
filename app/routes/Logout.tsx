import { logout } from "~/utils/sessions.server"
import { ActionFunction } from "@remix-run/node"

export const action: ActionFunction = async ({ request }) => logout(request)