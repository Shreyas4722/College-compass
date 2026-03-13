import mongoose from 'mongoose'

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Classroom', 'Lab', 'Office', 'Library', 'Cafeteria', 'Auditorium', 'Sports', 'Other']
  },
  building: {
    type: String,
    required: true
  },
  floor: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  capacity: {
    type: Number
  },
  amenities: [{
    type: String
  }]
}, {
  timestamps: true
})

// Index for better search performance
locationSchema.index({ name: 'text', building: 'text', type: 'text' })

export default mongoose.model('Location', locationSchema)
