// Packages
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

// Local Components
import { ReviewFeed, Ratings, Header, Costs, People, ReviewCreateOrUpdate } from './components'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Services
import { createPlaceReview, updatePlaceReview } from '@services/placeReview'

// Global Components
// import Map from '@components/Map'

// MUI
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

function PlaceDetails({ place }) {
  const { setAlert } = useAlert()
  const [baseData] = useState(place.baseData)
  const [placeReviews, setPlaceReviews] = useState(place.placeReviews)
  const [peopleCurrent] = useState(place.peopleCurrent)
  const [peopleBeen] = useState(place.peopleBeen)
  const [peopleWant] = useState(place.peopleWant)
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [userReview, setUserReview] = useState(null)
  const [placeReview, setPlaceReview] = useState({ text: '', ratings: {}, costs: {} })

  const ratings = [
    { label: 'Internet', name: 'internet' },
    { label: 'Family Friendly', name: 'familyFriendly' },
    { label: 'Vegan Friendly', name: 'veganFriendly' },
    { label: 'Vegeterian Friendly', name: 'vegeterianFriendly' },
    { label: 'Female Friendly', name: 'femaleFriendly' },
    { label: 'Coworking', name: 'coworking' },
    { label: 'Coliving', name: 'coliving' },
    { label: 'Healthcare', name: 'healthcare' },
    { label: 'Nightlife', name: 'nightlife' },
    { label: 'Peace', name: 'peace' },
    { label: 'Air Quality', name: 'airQuality' },
    { label: 'Fun', name: 'fun' },
    { label: 'Food', name: 'food' },
    { label: 'Safety', name: 'safety' },
    { label: 'Walkability', name: 'walkability' },
    { label: 'Traffic safety', name: 'trafficSafety' },
    { label: 'People', name: 'people' }
  ]

  const costs = {
    food: [
      { name: 'coffee', label: 'Coffee' },
      { name: 'cappuccino', label: 'Cappuccino' },
      { name: 'tea', label: 'Tea' },
      { name: 'beer', label: 'Beer' },
      { name: 'cocktail', label: 'Cocktail' },
      { name: 'lemonade', label: 'Lemonade 0.33l' },
      { name: 'water', label: 'Water 0.33l' },
      { name: 'localFood', label: 'Local Meal' },
      { name: 'restaurant', label: 'Restaurant Meal' }
    ],
    monthly: [
      { name: 'hotel', label: 'Hotel' },
      { name: 'airbnb', label: 'Airbnb' },
      { name: 'apartment', label: 'Apartment' },
      { name: 'house', label: 'House' },
      { name: 'villa', label: 'Villa' },
      { name: 'coworking', label: 'Coworking' },
      { name: 'scooter', label: 'Scooter' }
    ]
  }

  useEffect(() => {
    if (userReview) {
      setPlaceReview(userReview)
    }
  }, [userReview])

  useEffect(() => {
    handleAlreadyReviewed()
  }, [place, user, isAuthenticated])

  function handleAlreadyReviewed() {
    const hasAlreadyReviewed = placeReviews.map(review => review.user._id).includes(user.id)

    if (isAuthenticated && hasAlreadyReviewed) {
      const index = placeReviews.map(review => review.user._id).indexOf(user.id)
      const review = placeReviews[index]
      setUserReview(review)
    }
  }

  async function handleCreatePlaceReview() {
    const createdPlaceReview = await createPlaceReview({ ...placeReview, placeId: baseData._id })
    setPlaceReviews([...placeReviews, createdPlaceReview.data])
    setUserReview(createdPlaceReview.data)
    setAlert({ message: 'Place Review successfully created', variant: 'success' })
  }

  async function handleUpdatePlaceReview() {
    const index = placeReviews.map(review => review._id).indexOf(userReview._id)

    const updatedPlaceReview = await updatePlaceReview({
      ...placeReview,
      placeReviewId: userReview._id
    })

    setPlaceReviews([
      ...placeReviews.slice(0, index),
      updatedPlaceReview.data,
      ...placeReviews.slice(index + 1)
    ])

    setUserReview(updatedPlaceReview.data)
    setAlert({ message: 'Place Review successfully updated', variant: 'success' })
  }

  function StyledDivider() {
    return (
      <Box my={4}>
        <Divider />
      </Box>
    )
  }

  return (
    <>
      <Header baseData={baseData} placeReviews={placeReviews} />

      <ReviewCreateOrUpdate
        ratings={ratings}
        costs={costs}
        userReview={userReview}
        handleCreatePlaceReview={handleCreatePlaceReview}
        handleUpdatePlaceReview={handleUpdatePlaceReview}
        placeReview={placeReview}
        setPlaceReview={setPlaceReview}
        baseData={baseData}
      />
      <StyledDivider />

      <Box mb={6}>
        <Costs placeReviews={placeReviews} costs={costs} />
      </Box>

      <StyledDivider />

      <Box mb={6}>
        <Ratings placeReviews={placeReviews} ratings={ratings} />
      </Box>

      <ReviewFeed placeReviews={placeReviews} />
      <StyledDivider />

      <People type="current" baseData={baseData} peopleCurrent={peopleCurrent} />
      <StyledDivider />

      <People type="been" baseData={baseData} peopleBeen={peopleBeen} />
      <StyledDivider />

      <People type="want" baseData={baseData} peopleWant={peopleWant} />
      <StyledDivider />

      <Typography variant="h6">
        <Box mb={4}>Where you will be</Box>
      </Typography>
      <Card>
        Out commented
        {/* <Map
          height="300px"
          width="100%"
          lng={place.mapBox.geometry.coordinates[0]}
          lat={place.mapBox.geometry.coordinates[1]}
        /> */}
      </Card>
    </>
  )
}

PlaceDetails.propTypes = {
  place: PropTypes.object
}

export default PlaceDetails
