import express from 'express'
import Faculty from '../models/Faculty.js'

const router = express.Router()

// Get all faculty
router.get('/', async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ name: 1 })
    res.json(faculty)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get faculty by ID
router.get('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id)
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' })
    }
    res.json(faculty)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get faculty by department
router.get('/department/:dept', async (req, res) => {
  try {
    const faculty = await Faculty.find({ department: req.params.dept }).sort({ name: 1 })
    res.json(faculty)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Search faculty
router.get('/search/:query', async (req, res) => {
  try {
    const faculty = await Faculty.find({
      $text: { $search: req.params.query }
    })
    res.json(faculty)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new faculty
router.post('/', async (req, res) => {
  try {
    const faculty = new Faculty(req.body)
    await faculty.save()
    res.status(201).json(faculty)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update faculty
router.put('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' })
    }
    res.json(faculty)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete faculty
router.delete('/:id', async (req, res) => {
  try {
    const faculty = await Faculty.findByIdAndDelete(req.params.id)
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' })
    }
    res.json({ message: 'Faculty deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
