import { GymEvent } from '@/models/gymEvent'
import { checkPermissions, getUserFromToken } from '@/helpers/tokenHandler.js'

export async function PATCH(request) {
  try {
    let body = await request.json()
    let queryId = request.nextUrl.searchParams.get("_id")
    let currentEvent = await GymEvent.findOne({ _id: queryId }).exec()
    if (getUserFromToken(request)?._id === currentEvent.user || checkPermissions(request, "Staff")) {
      let event = await GymEvent.findOneAndUpdate({ _id: queryId }, body, { new: true })
      return Response.json({ event }, { status: 200 })
    } else {
      return Response.json({ error: "Permisos insuficientes" }, { status: 401 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}