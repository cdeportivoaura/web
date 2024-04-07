import { GymEvent } from '@/models/gymEvent'
import { checkPermissions } from '@/helpers/tokenHandler'

export async function POST(request) {
  try {
    let body = await request.json()
    if (!checkPermissions(request, "User"))
      return Response.json({ error: "Permisos insuficientes" }, { status: 401 })
    let event = await GymEvent.create({
      ...body,
      startDate: new Date(body.startDate),
      endDate: new Date(body.endDate)
    })
    return Response.json({ event }, { status: 201 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}