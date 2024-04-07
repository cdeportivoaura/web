import conn from '@/database'
import mongoose from 'mongoose'

const SportSchema = new mongoose.Schema({
  name: String,
  spName: String,
  viewBox: String,
  strokeWidth: Number,
  rotate: Boolean,
  flip: Boolean,
  path: String,
  description: String,
  coordinator: Object
}, {
  collection: 'sport',
  minimize: false
})

let Sport
if (mongoose.models.Sport) Sport = mongoose.models.Sport
else Sport = mongoose.model('Sport', SportSchema)
export { Sport }
