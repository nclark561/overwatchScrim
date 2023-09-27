import { Form } from "@remix-run/react"

export default function AuthReq() {
  return (
    <Form method="post">
        <p>Must be logged in to access this page.</p>
        <button type="submit">Login Here</button>
    </Form> 
  )
}
