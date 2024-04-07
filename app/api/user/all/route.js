import { User } from "@/models/user"

export async function GET() {
  try {
    return Response.json({ results: await User.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}