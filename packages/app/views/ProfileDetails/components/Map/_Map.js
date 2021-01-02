// Packages
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

// MUI
import Card from '@material-ui/core/Card'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const Map = ({ lat, lng }) => {
  const mapContainerRef = useRef(null)

  // initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat], // longitude, latitude
      zoom: 2
    })

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right')

    // set a marker
    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)
    // clean up on unmount
    return () => map.remove()
  }, []) // eslint-disable-line

  return (
    <Card style={{ height: '300px' }}>
      <div
        style={{ width: '100%', height: '100%' }}
        className="map-container"
        ref={mapContainerRef}
      />
    </Card>
  )
}

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired
}

export default Map
