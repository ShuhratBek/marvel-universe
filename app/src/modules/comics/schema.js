import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String
  }
})

export default schema
