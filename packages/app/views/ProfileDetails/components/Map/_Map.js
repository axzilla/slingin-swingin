// Packages
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import React from 'react'
import PropTypes from 'prop-types'

// MUI
import Card from '@material-ui/core/Card'

export class MapContainer extends React.Component {
  render() {
    const mapStyles = { width: '100%', height: '100%' }
    const containerStyle = { position: 'relative', width: '100%', height: '100%' }

    return (
      <Card variant="outlined" style={{ height: '300px' }}>
        <Map
          google={this.props.google}
          zoom={1}
          style={mapStyles}
          containerStyle={containerStyle}
          initialCenter={{ lat: this.props.lat, lng: this.props.lng }}
        >
          <Marker position={{ lat: this.props.lat, lng: this.props.lng }} />
        </Map>
      </Card>
    )
  }
}

MapContainer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  google: PropTypes.object.isRequired
}

export default GoogleApiWrapper({ apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY })(MapContainer)
