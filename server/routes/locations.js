import express from 'express'
import Location from '../models/Location.js'

const router = express.Router()

// Get all locations
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find().sort({ name: 1 })
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get location by ID
router.get('/:id', async (req, res) => {
  try {
    const location = await Location.findById(req.params.id)
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json(location)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search locations
router.get('/search/:query', async (req, res) => {
  try {
    const locations = await Location.find({
      $text: { $search: req.params.query }
    })
    res.json(locations)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new location
router.post('/', async (req, res) => {
  try {
    const location = new Location(req.body)
    await location.save()
    res.status(201).json(location)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update location
router.put('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json(location)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete location
router.delete('/:id', async (req, res) => {
  try {
    const location = await Location.findByIdAndDelete(req.params.id)
    if (!location) {
      return res.status(404).json({ error: 'Location not found' })
    }
    res.json({ message: 'Location deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
