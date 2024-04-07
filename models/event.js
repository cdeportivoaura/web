import conn from '@/database'
import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  start: Date,
  startStr: String,
  end: Date,
  endStr: String,
  title: String,
  user: String,
  name: String,
  others: Object
}, {
  collection: 'event',
  minimize: false
})

let Event
if (mongoose.models.Event) Event = mongoose.models.Event
else Event = mongoose.model('Event', EventSchema)
export { Event }
