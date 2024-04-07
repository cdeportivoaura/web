import conn from '@/database'
import mongoose from 'mongoose'

const NewSchema = new mongoose.Schema({
  title: String,
  body: String,
  googleId: String
}, {
  collection: 'new',
  minimize: false
})

let New
if (mongoose.models.New) New = mongoose.models.New
else New = mongoose.model('New', NewSchema)
export { New }
