import { Event } from "@/models/event"
import { revalidatePath } from "next/cache"

export async function GET(request) {
  const path = request.nextUrl.searchParams.get('path')
  try {
    revalidatePath(path)
    return Response.json({ results: await Event.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}