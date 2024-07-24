const mongoose = require('mongoose')

const AirportSchema = new mongoose.Schema(
  {
    icao: {
      type: String,
      require: true,
      unique: true,
      min: 4,
      max: 4
    },
    iata: {
      type: String,
      require: false,
      unique: true,
      min: 3,
      max: 3
    },
    name: {
      type: String,
      require: false,
      unique: true
    },
    city: {
      type: String,
      require: false,
      unique: false
    },
    subd: {
      type: String,
      require: false,
      unique: false
    },
    country: {
      type: String,
      require: true,
      unique: false
    },
    elevation: {
      type: Number,
      require: false,
      unique: false
    },
    lat: {
      type: Decimal128,
      require: true,
      unique: false
    },
    lon: {
      type: Decimal128,
      require: true,
      unique: false
    },
    tz: {
      type: String,
      require: true,
      unique: false
    },
    lid: {
      type: String,
      require: false,
      unique: false
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Airport', AirportSchema)
