// Packages
import PropTypes from 'prop-types'

// Services
import { getAllPlaces } from '@services/place'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Places as PlacesView } from '@views'

function Places({ places }) {
  return (
    <MainLayout>
      <PlacesView places={places} />
    </MainLayout>
  )
}

Places.getInitialProps = async ctx => {
  try {
    const { data } = await getAllPlaces()
    return { places: data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired
}

export default Places
