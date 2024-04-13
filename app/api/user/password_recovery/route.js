import { User } from '@/models/user'
import { TempToken } from '@/models/tempToken'
import { v4 as uuidv4 } from 'uuid'
import { sendEmail } from '@/helpers/mailer'

export async function POST(request) {
  try {
    const body = await request.json()
    let user = await User.findOne({ email: body.email }).exec()

    if (!Boolean(user))
      return Response.json({
        error: 'Email not found'
      }, { status: 404 })

    let id = uuidv4()
    let token = await TempToken.create({
      uuid: id,
      email: user.email
    })

    if (!Boolean(token))
      return Response.json({
        error: 'Token was not created'
      }, { status: 404 })

    sendEmail(
      user.email,
      "Reestablecer contraseña",
      `Hola ${user.first_name.split(" ")[0]}
      <br><br>
      Al parecer olvidaste tu contraseña y solicitaste reestablecerla.
      <br>
      Si no has sido tú, por favor ignora este correo.
      <br>
      En caso contrario, para reestablecer tu contraseña por favor ingresa al siguiente link:
      <br>
      <a href="https://cdeportivoaura.cl/password_reset/${id}">Reestablecer contraseña</a><br>`
    )

    return Response.json({
      message: "Password recovery email sent"
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}