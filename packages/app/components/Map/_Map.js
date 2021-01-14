// Packages
import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

const Map = ({ lat, lng, height, width }) => {
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

  return <div style={{ width, height }} className="map-container" ref={mapContainerRef} />
}

Map.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  height: PropTypes.string,
  width: PropTypes.string
}

export default Map
