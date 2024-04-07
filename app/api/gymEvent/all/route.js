import { GymEvent } from "@/models/gymEvent"

export async function GET(request) {
  try {
    return Response.json({ results: await GymEvent.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}