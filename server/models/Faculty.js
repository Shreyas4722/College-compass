import mongoose from 'mongoose'

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  office: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String
  },
  specialization: [{
    type: String
  }],
  officeHours: {
    type: String
  }
}, {
  timestamps: true
})

// Index for better search performance
facultySchema.index({ name: 'text', department: 'text', designation: 'text' })

export default mongoose.model('Faculty', facultySchema)
