import { GymEvent } from '@/models/gymEvent'
import { checkPermissions, getUserFromToken } from '@/helpers/tokenHandler.js'

export async function DELETE(request) {
  try {
    let queryId = await request.nextUrl.searchParams.get("_id")
    let currentEvent = await GymEvent.findOne({ _id: queryId }).exec()
    if (getUserFromToken(request)?._id === currentEvent.user || checkPermissions(request, "Staff")) {
      let event = await GymEvent.findOneAndDelete({ _id: queryId })
      return Response.json({ event }, { status: 200 })
    } else {
      return Response.json({ error: "Permisos insuficientes" }, { status: 401 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}