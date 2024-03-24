const router = require("express").Router()
const Pin = require("../models/Pin")

/* Create a pin */

router.post("/", async (request, response) => {
    const new_pin = new Pin(request.body)
    try {
        const saved_pin = await new_pin.save()
        response.status(200).json(saved_pin)
    } catch (err) {
        response.status(500).json(err)
    }
})

/* Get all existing pins */

router.get("/", async (request, response) => {
    try {
        const pins = await Pin.find()
        
        response.status(200).json(pins)
    } catch (err) {
        response.status(500).json(err)
    }
})

module.exports = router