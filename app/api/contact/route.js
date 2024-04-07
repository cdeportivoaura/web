import { sendEmail } from "@/helpers/mailer"

export async function POST(request) {
  try {
    let body = await request.json()
    let email = body.email
    let name = body.name
    let subject = body.subject
    let content = body.content

    sendEmail(
      "cdeportivoaura@gmail.com",
      `${subject} - Contacto Web`,
      `${name} [${email}] utilizó el formulario de contacto de la página web para escribir:<br><br>${content}`
    )

    return Response.json({
      message: "Email sent"
    }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: error }, { status: 500 })
  }
}