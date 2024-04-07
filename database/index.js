import mongoose from 'mongoose'

if (!global._mongoClientPromise) {
  global._mongoClientPromise = mongoose
    .connect(process.env.MONGO_URI)
    .then(_db => console.log(`Database is connected`))
    .catch(err => {
      console.log(err)
      console.log("\n---------------------------------------")
      console.log("Exit web until DB is ready\n")
      return process.exit(22)
    })
}
const clientPromise = global._mongoClientPromise

export default clientPromise