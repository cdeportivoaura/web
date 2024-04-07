import conn from '@/database'
import mongoose from 'mongoose'

const ImgSchema = new mongoose.Schema({
  name: String,
  format: String,
  googleId: String
}, {
  collection: 'img',
  minimize: false
})

let Img
if (mongoose.models.Img) Img = mongoose.models.Img
else Img = mongoose.model('Img', ImgSchema)
export { Img }
