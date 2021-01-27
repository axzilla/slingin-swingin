// Packages
import PropTypes from 'prop-types'

// Layouts
import { Place as PlaceLayout } from '@layouts'

// Views
import { PlaceDetails as PlaceDetailsView } from '@views'

// Services
import { getPlaceByShortId } from '@services/place'
import { getPlaceReviewsByPlaceId } from '@services/placeReview'
import {
  getPlaceCurrentUsersByPlaceId
  // getPlaceBeenUsersByPlaceId,
  // getPlaceWantUsersByPlaceId
} from '@services/user'

// Global Components
import { SeoMeta } from '@components'

function PlaceDetails({ place }) {
  return (
    <>
      <SeoMeta
        title={`${place.baseData.mapBox.place_name} - digitalnomads.dev`}
        desc={place.baseData.content}
        canonical={`https://www.digitalnomads.dev/place/${place.baseData.shortId}/${place.baseData.urlSlug}`}
        ogImage={(place.baseData.photo && place.baseData.photo.secure_url) || null}
        ogTitle={place.baseData.mapBox.place_name}
        // ogDescription={htmlRemove(rawToHtml(place.baseData.content))}
      />
      <PlaceLayout>
        <PlaceDetailsView place={place} />
      </PlaceLayout>
    </>
  )
}

PlaceDetails.getInitialProps = async ctx => {
  try {
    const { shortId } = ctx.query

    const place = await getPlaceByShortId(shortId)
    const placeReviews = await getPlaceReviewsByPlaceId(place.data._id)
    const peopleCurrent = await getPlaceCurrentUsersByPlaceId(place.data._id)
    // const peopleBeen = await getPlaceBeenUsersByPlaceId(place.data._id)
    // const peopleWant = await getPlaceWantUsersByPlaceId(place.data._id)

    const data = {
      baseData: place.data,
      placeReviews: placeReviews.data,
      peopleCurrent: peopleCurrent.data,
      peopleBeen: [],
      peopleWant: []
      // peopleBeen: peopleBeen.data,
      // peopleWant: peopleWant.data
    }

    return { place: data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

PlaceDetails.propTypes = {
  place: PropTypes.object
}

export default PlaceDetails
