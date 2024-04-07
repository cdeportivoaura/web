import { User } from "@/models/user"
import { checkPermissions } from '@/helpers/tokenHandler'

export async function GET(request) {
  try {
    let queryId = request.nextUrl.searchParams.get("_id")
    if (!checkPermissions(request, "User"))
      return Response.json({ error: "Permisos insuficientes" }, { status: 401 })
    let user = await User.findOne({ _id: queryId }).exec()
    return Response.json({
      image: user.image
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}