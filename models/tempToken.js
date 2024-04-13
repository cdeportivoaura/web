import conn from '@/database'
import mongoose from 'mongoose'

const TempTokenSchema = new mongoose.Schema({
  uuid: String,
  email: String
}, {
  collection: 'tempToken',
  minimize: false
})

let TempToken
if (mongoose.models.TempToken) TempToken = mongoose.models.TempToken
else TempToken = mongoose.model('TempToken', TempTokenSchema)
export { TempToken }
