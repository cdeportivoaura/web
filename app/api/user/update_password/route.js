import { TempToken } from '@/models/tempToken'
import { User } from '@/models/user'
import { hashSync } from 'bcrypt'

export async function POST(request) {
  const body = await request.json()
  const token = await TempToken.findOne({ uuid: body.uuid })
  if (!Boolean(token)) return Response.json({
    error: 'URL token not found'
  }, { status: 404 })

  var hash = hashSync(body.password.trim(), 10)
  let user = await User.findOneAndUpdate({ email: token.email }, { password: hash }, { new: true })
  if (!Boolean(user)) {
    return Response.json({
      error: 'Email not found'
    }, { status: 400 })
  }

  await TempToken.findOneAndDelete({ uuid: body.uuid })

  return Response.json({ user: user }, { status: 200 })
}