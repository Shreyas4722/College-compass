import { useState, useEffect } from 'react'
import axios from 'axios'
import './Faculty.css'

function Faculty() {
  const [faculty, setFaculty] = useState([])
  const [filteredFaculty, setFilteredFaculty] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFaculty()
  }, [])

  useEffect(() => {
    filterFaculty()
  }, [searchQuery, selectedDepartment, faculty])

  const fetchFaculty = async () => {
    try {
      const response = await axios.get('/api/faculty')
      setFaculty(response.data)
      setFilteredFaculty(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching faculty:', error)
      setLoading(false)
    }
  }

  const filterFaculty = () => {
    let filtered = faculty

    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(f => f.department === selectedDepartment)
    }

    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.department.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredFaculty(filtered)
  }

  const departments = ['All', ...new Set(faculty.map(f => f.department))]

  return (
    <div className="faculty-page page">
      <div className="container">
        <div className="faculty-header fade-in">
          <h1>Faculty Directory</h1>
          <p>Find and connect with our distinguished faculty members</p>
        </div>

        <div className="faculty-filters fade-in">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search faculty..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="department-filters">
            {departments.map(dept => (
              <button
                key={dept}
                className={`filter-btn ${selectedDepartment === dept ? 'active' : ''}`}
                onClick={() => setSelectedDepartment(dept)}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading faculty...</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              {filteredFaculty.length} faculty member{filteredFaculty.length !== 1 ? 's' : ''} found
            </div>

            <div className="faculty-grid">
              {filteredFaculty.map((member) => (
                <div key={member._id} className="faculty-card">
                  <div className="faculty-avatar">
                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <h3>{member.name}</h3>
                  <p className="designation">{member.designation}</p>
                  <div className="faculty-details">
                    <div className="detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{member.department}</span>
                    </div>
                    <div className="detail-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                      <span>{member.office}</span>
                    </div>
                    {member.email && (
                      <div className="detail-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        <span className="email-text">{member.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {filteredFaculty.length === 0 && (
              <div className="no-results">
                <h3>No faculty members found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Faculty
