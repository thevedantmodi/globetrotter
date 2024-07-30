const mongoose = require('mongoose')

const AirportSchema = new mongoose.Schema(
  {
    type: {
      /* For "Feature" tag */
      type: String,
      require: true,
      unique: false
    },
    geometry: {
      type: {
        type: String,
        enum: ['Point']
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    properties: {
      icao: {
        type: String,
        require: true,
        unique: false,
        min: 4,
        max: 4
      },
      iata: {
        type: String,
        require: false,
        unique: false,
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
        type: Number,
        require: true,
        unique: false
      },
      lon: {
        type: Number,
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
      },
      size: {
        type: String,
        require: false,
        unique: false
      }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Airport', AirportSchema)
