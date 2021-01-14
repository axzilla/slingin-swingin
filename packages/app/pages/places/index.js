// Packages
import PropTypes from 'prop-types'

// Services
import { getAllPlaces } from '@services/place'

// Utils
import objToQuery from '@utils/objToQuery'

// Layouts
import { Place as PlaceLayout } from '@layouts'

// Views
import { PlaceFeed as PlaceFeedView } from '@views'

function PlaceFeed({ places }) {
  return (
    <PlaceLayout>
      <PlaceFeedView places={places} />
    </PlaceLayout>
  )
}

PlaceFeed.getInitialProps = async ({ res, query }) => {
  try {
    const { data } = await getAllPlaces(objToQuery(query))
    return { places: data }
  } catch (error) {
    if (error) {
      res.writeHead(302, { Location: '/not-found' })
      res.end()
    }
  }
}

PlaceFeed.propTypes = {
  places: PropTypes.object.isRequired
}

export default PlaceFeed
