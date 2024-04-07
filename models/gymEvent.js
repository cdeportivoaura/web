import conn from '@/database'
import mongoose from 'mongoose'

const GymEventSchema = new mongoose.Schema({
  start: Date,
  startStr: String,
  end: Date,
  endStr: String,
  title: String,
  user: String,
  name: String,
  others: Object
}, {
  collection: 'gymEvent',
  minimize: false
})

let GymEvent
if (mongoose.models.GymEvent) GymEvent = mongoose.models.GymEvent
else GymEvent = mongoose.model('GymEvent', GymEventSchema)
export { GymEvent }
