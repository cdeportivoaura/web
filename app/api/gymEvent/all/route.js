import { GymEvent } from "@/models/gymEvent"

export async function GET(request) {
  try {
    let date = request.nextUrl.searchParams.get("date")
    let prevDate = new Date(date)
    let nextDate = new Date(date)
    prevDate = new Date(prevDate.setDate(0))
    if (nextDate.getMonth() == 11) {
      nextDate = new Date(nextDate.getFullYear() + 1, 0, 1);
    } else {
      nextDate = new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 1);
    }
    const events = await GymEvent.find({ start: { $gte: prevDate, $lt: nextDate } })
    return Response.json({ results: events }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}