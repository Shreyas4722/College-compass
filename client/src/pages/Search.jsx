import { useState, useEffect } from 'react'
import axios from 'axios'
import './Search.css'

function Search() {
  const [searchQuery, setSearchQuery] = useState('')
  const [locations, setLocations] = useState([])
  const [filteredLocations, setFilteredLocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedLocation, setSelectedLocation] = useState(null)

  useEffect(() => {
    fetchLocations()
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredLocations(locations)
    } else {
      const filtered = locations.filter(location =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        location.building.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredLocations(filtered)
    }
  }, [searchQuery, locations])

  const fetchLocations = async () => {
    try {
      const response = await axios.get('/api/locations')
      setLocations(response.data)
      setFilteredLocations(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching locations:', error)
      setLoading(false)
    }
  }

  const handleLocationClick = (location) => {
    setSelectedLocation(location)
  }

  const closeModal = () => {
    setSelectedLocation(null)
  }

  return (
    <div className="search-page page">
      <div className="container">
        <div className="search-header fade-in">
          <h1>Find Your Destination</h1>
          <p>Search for classrooms, offices, facilities, and more</p>
        </div>

        <div className="search-box fade-in">
          <svg className="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <input
            type="text"
            placeholder="Search by name, building, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searchQuery && (
            <button className="clear-btn" onClick={() => setSearchQuery('')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading locations...</p>
          </div>
        ) : (
          <>
            <div className="results-count">
              {filteredLocations.length} location{filteredLocations.length !== 1 ? 's' : ''} found
            </div>

            <div className="locations-grid">
              {filteredLocations.map((location) => (
                <div
                  key={location._id}
                  className="location-card"
                  onClick={() => handleLocationClick(location)}
                >
                  <div className="location-type-badge">{location.type}</div>
                  <h3>{location.name}</h3>
                  <div className="location-info">
                    <div className="info-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{location.building}</span>
                    </div>
                    <div className="info-item">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{location.floor}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredLocations.length === 0 && (
              <div className="no-results">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <h3>No locations found</h3>
                <p>Try adjusting your search terms</p>
              </div>
            )}
          </>
        )}
      </div>

      {selectedLocation && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            <div className="modal-header">
              <div className="location-type-badge">{selectedLocation.type}</div>
              <h2>{selectedLocation.name}</h2>
            </div>
            
            <div className="modal-body">
              <div className="detail-row">
                <strong>Building:</strong>
                <span>{selectedLocation.building}</span>
              </div>
              <div className="detail-row">
                <strong>Floor:</strong>
                <span>{selectedLocation.floor}</span>
              </div>
              <div className="detail-row">
                <strong>Description:</strong>
                <span>{selectedLocation.description}</span>
              </div>
              {selectedLocation.capacity && (
                <div className="detail-row">
                  <strong>Capacity:</strong>
                  <span>{selectedLocation.capacity}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search
