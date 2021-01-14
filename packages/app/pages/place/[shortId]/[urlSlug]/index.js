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
  getPlaceCurrentProfilesByPlaceId
  // getPlaceBeenProfilesByPlaceId,
  // getPlaceWantProfilesByPlaceId
} from '@services/profile'

// Global Components
import { SeoMeta } from '@components'

function PlaceDetails({ place }) {
  return (
    <>
      <SeoMeta
      // title={`${post.title} - noize.dev`}
      // desc={post.content}
      // canonical={`https://www.noize.dev/post/${post.shortId}/${urlSlug}`}
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
    const peopleCurrent = await getPlaceCurrentProfilesByPlaceId(place.data._id)
    // const peopleBeen = await getPlaceBeenProfilesByPlaceId(place.data._id)
    // const peopleWant = await getPlaceWantProfilesByPlaceId(place.data._id)

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
