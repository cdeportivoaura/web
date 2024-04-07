import { Event } from "@/models/event"

export async function GET(request) {
  try {
    return Response.json({ results: await Event.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}