import { z } from "zod"
import { loginSchema } from "../schemas"

type iLogin = z.infer<typeof loginSchema>

export {
  iLogin
}