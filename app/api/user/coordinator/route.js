import { User } from "@/models/user"

export async function GET(request) {
  try {
    let queryId = request.nextUrl.searchParams.get("_id")
    let coord = await User.findOne({ _id: queryId })
    return Response.json({
      result: {
        name: `${coord.first_name.split(' ')[0]} ${coord.last_name.split(' ')[0]}`,
        email: coord.email,
        image: coord.image
      }
    }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}