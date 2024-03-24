const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true
    },
    title: {
      type: String,
      require: true,
      unique: true,
      min: 3
    },
    desc: {
      type: String,
      require: true,
      unique: true,
      min: 3
    },
    lat: {
      type: Number,
      require: true
    },
    lon: {
      type: Number,
      require: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Pin', PinSchema)
