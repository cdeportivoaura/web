import { User } from '@/models/user'
import { hashSync } from 'bcrypt'

export async function POST(request) {
  var body = await request.json()
  var hash = hashSync(body.password.trim(), 10)

  let created = await User.exists({ email: body.email.trim() })
  if (created) {
    return Response.json({
      error: 'El correo ya se encuentra registrado'
    }, { status: 500 })
  }

  let user = await User.create({
    ...body,
    password: hash,
    role: (body.subscribed) ? "Member" : "User",
    created: new Date()
  })

  return Response.json({
    user: user
  }, { status: 201 })
}