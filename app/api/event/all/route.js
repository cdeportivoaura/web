import { Event } from "@/models/event"
import { revalidatePath } from 'next/cache'
revalidatePath('/calendar')

export async function GET(request) {
  try {
    return Response.json({ results: await Event.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}