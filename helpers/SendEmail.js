export async function sendEmail(name, email, subject, content) {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify({ name, email, subject, content }),
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    })

    let data = await res.json()
    if (res.status === 200) return true
    return false
  } catch (error) {
    return false
  }
}
