import { SignJWT, jwtVerify } from 'jose'
import { headers } from 'next/headers'

// Generate JSON web token based on user info
export async function generateToken(user) {
  let u = {
    _id: user._id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    birthday: user.birthday,
    subscribed: user.subscribed,
    role: user.role
  }

  let token = await new SignJWT(u)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(process.env.JWT_SECRET || 'secretJWT'))
  return token
}

// Permission Level depending on role
function getPermissionLevel(role) {
  switch (role) {
    case "Reader":
      return 0
    case "User":
      return 1
    case "Member":
      return 2
    case "Coordinator":
      return 3
    case "Staff":
      return 4
    case "Admin":
      return 5
    default:
      return 0
  }
}

// Verify JWT
export async function checkPermissions(req, role) {
  let user = await getUserFromToken(req)
  if (!Boolean(user)) return false
  if (getPermissionLevel(user.role) >= getPermissionLevel(role))
    return true
  return false
}

// Get user from token
export function getUserFromToken(req) {
  const headersList = headers()
  let auth = headersList.get('authorization')
  let authorization = auth?.split(' ')
  if (authorization[0] !== "Bearer")
    return undefined

  return jwtVerify(authorization[1], new TextEncoder().encode(process.env.JWT_SECRET || 'secretJWT'))
}