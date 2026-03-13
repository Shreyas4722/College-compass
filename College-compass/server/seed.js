import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Location from './models/Location.js'
import Faculty from './models/Faculty.js'

dotenv.config()

// Real Alliance University Faculty Data
const allianceFaculty = [
  {
    name: 'Dr. Anirudh Sridhar',
    designation: 'Dean of Thought Leadership',
    department: 'English',
    office: 'Alliance University Campus',
    email: 'anirudh.sridhar@alliance.edu.in',
    specialization: ['English Literature'],
    qualification: 'D.Phil. in English, University of Oxford'
  },
  {
    name: 'Dr. Vivek V',
    designation: 'Professor and Deputy Director',
    department: 'Computer Science and Engineering',
    office: 'Alliance School of Advanced Engineering',
    email: 'vivek.v@alliance.edu.in',
    specialization: ['Computer Science', 'Engineering'],
    qualification: 'Ph.D. in Computer Science and Engineering, National University of Singapore'
  },
  {
    name: 'Mr. Sumit Kumar',
    designation: 'Assistant Professor',
    department: 'Data Science',
    office: 'Alliance School of Advanced Computing',
    email: 'sumit.kumar@alliance.edu.in',
    specialization: ['Data Science', 'Machine Learning'],
    qualification: 'M.Tech in Data Science, Jawaharlal Nehru University',
    officeHours: 'Mon-Fri: 3PM-5PM'
  },
  {
    name: 'Dr. Reeba Korah',
    designation: 'Professor & Dean - ASAE',
    department: 'Information & Communication Engineering',
    office: 'Alliance School of Applied Engineering',
    email: 'reeba.korah@alliance.edu.in',
    specialization: ['Information Engineering', 'Communication Engineering'],
    qualification: 'Ph.D. in Information & Communication Engineering, Anna University'
  },
  {
    name: 'Dr. K. Ramalakshmi',
    designation: 'Professor & HOD - Computer Science',
    department: 'Computer Science and Engineering',
    office: 'Alliance School of Advanced Computing',
    email: 'k.ramalakshmi@alliance.edu.in',
    specialization: ['Computer Vision', 'AI', 'Machine Learning'],
    qualification: 'Ph.D. in Information & Communication Engineering, Anna University'
  }
]

// Alliance University Campus Locations
const allianceLocations = [
  {
    name: 'Alliance School of Business (ASOB)',
    type: 'Office',
    building: 'Main Campus',
    floor: 'Ground Floor',
    description: 'Alliance School of Business offers undergraduate, postgraduate and doctoral programs in management and business administration.',
    amenities: ['Classrooms', 'Faculty Offices', 'Student Lounge', 'WiFi', 'AC']
  },
  {
    name: 'Alliance School of Advanced Engineering (ASAE)',
    type: 'Office',
    building: 'Engineering Block',
    floor: 'Multiple Floors',
    description: 'State-of-the-art engineering school with modern labs and research facilities.',
    amenities: ['Computer Labs', 'Engineering Labs', 'Research Centers', 'WiFi', 'AC']
  },
  {
    name: 'Alliance School of Law',
    type: 'Office',
    building: 'Law Block',
    floor: 'Ground and First Floor',
    description: 'Premier law school offering undergraduate and postgraduate programs in law.',
    amenities: ['Moot Court', 'Library', 'Classrooms', 'WiFi']
  },
  {
    name: 'Central Library',
    type: 'Library',
    building: 'Main Campus - Central Block',
    floor: 'First and Second Floor',
    description: 'Extensive collection of books, journals, digital resources and quiet study areas.',
    capacity: 500,
    amenities: ['Reading Rooms', 'Digital Library', 'Study Cubicles', 'Printing', 'WiFi', 'AC']
  },
  {
    name: 'Computer Science Lab - Block A',
    type: 'Lab',
    building: 'Engineering Block A',
    floor: 'Ground Floor',
    description: 'Advanced computer lab with latest hardware and software for programming and development.',
    capacity: 60,
    amenities: ['Latest Computers', 'Software Development Tools', 'Projector', 'AC', 'High-speed Internet']
  }
]

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/college_compass', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('✅ Connected to MongoDB')

    await Location.deleteMany({})
    await Faculty.deleteMany({})
    console.log('🗑️  Cleared existing data')

    await Location.insertMany(allianceLocations)
    await Faculty.insertMany(allianceFaculty)
    console.log('✅ Real Alliance University data inserted successfully!')

    console.log(`📍 ${allianceLocations.length} locations added`)
    console.log(`👨‍🏫 ${allianceFaculty.length} faculty members added`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    process.exit(1)
  }
}

seedDatabase()
