import { New } from '@/models/new'

export async function GET() {
  try {
    return Response.json({ results: await New.find().sort({ date: "desc" }) }, { status: 200 })
  } catch (error) {
    return Response.json({ error: error }, { status: 500 })
  }
}