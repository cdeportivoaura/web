import conn from '@/database'
import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  password: String,
  birthday: Date,
  created: Date,
  subscribed: Boolean,
  theme: String,
  role: String,
  phone: String,
  image: {
    data: Buffer,
    contentType: String
  }
}, {
  collection: 'user',
  minimize: false
})

let User
if (mongoose.models.User) User = mongoose.models.User
else User = mongoose.model('User', UserSchema)
export { User }
