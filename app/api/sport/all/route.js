import { Sport } from '@/models/sport'

// GET - Get all sports
export async function GET() {
  try {
    return Response.json({ results: await Sport.find() }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}
