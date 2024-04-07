import { compare } from 'bcrypt'
import { User } from '@/models/user'
import { generateToken } from '@/helpers/tokenHandler'

export async function POST(request) {
  let body = await request.json()
  let user = await User.findOne({ email: body.user.email }).exec()

  if (!Boolean(user))
    return Response.json({
      error: 'Email not found'
    }, { status: 404 })

  function compareAsync(param1, param2) {
    return new Promise(function (resolve, reject) {
      compare(param1, param2, async function (err, res) {
        if (err) {
          reject(err);
        } else {
          resolve(await generateToken(user));
        }
      });
    });
  }

  const token = await compareAsync(body.user.password, user.password);
  if (token) {
    return Response.json({
      user: user,
      token: token
    }, { status: 200 })
  } else {
    return Response.json({
      error: 'Wrong credentials'
    }, { status: 404 })
  }
}