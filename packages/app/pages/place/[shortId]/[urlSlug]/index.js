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
      // title={`${post.title} - digitalnomads.dev`}
      // desc={post.content}
      // canonical={`https://www.digitalnomads.dev/post/${post.shortId}/${urlSlug}`}
      // ogImage={(post.titleImage && post.titleImage.secure_url) || null}
      // ogTitle={post.title}
      // ogDescription={htmlRemove(rawToHtml(post.content))}
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
