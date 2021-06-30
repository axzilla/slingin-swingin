// Packages
import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'

// Contexts
import { useAlert } from '@contexts/AlertContext'

// Redux
import { authModalReducer } from '@slices/authSlice'

// Services
import { passwordResetValidation } from '@services/auth'
import { getPosts } from '@services/post'

// Utils
import objToQuery from '@utils/objToQuery'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Landing as LandingView } from '@views'

// Global Components
// import { SeoMeta } from '@components'

function PasswordReset({ resetPasswordToken, posts }) {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()

  useEffect(() => {
    if (resetPasswordToken) {
      dispatch(authModalReducer({ isOpen: true, type: 'ResetPassword' }))
    } else {
      dispatch(authModalReducer({ isOpen: true, type: 'ForgotPassword' }))
      setAlert({
        message: `Your request to reset password has already expired. Please try again.`,
        variant: 'error'
      })
    }
  }, [])

  return (
    <>
      {/* <SeoMeta
        title={'digitalnomads.dev - The #1 Digital Nomad Community'}
        desc={
          'digitalnomads.dev (or just dino) is a platform where any kind of digital nomad write articles, take part in discussions, and build their professional profiles.'
        }
        canonical="https://www.digitalnomads.dev"
        ogImage={null}
      /> */}
      <MainLayout>
        <LandingView posts={posts} />
      </MainLayout>
    </>
  )
}

PasswordReset.getInitialProps = async ({ query }) => {
  const { resetPasswordToken } = query
  const posts = await getPosts(objToQuery(query))
  const { data } = await passwordResetValidation(resetPasswordToken)

  return {
    resetPasswordToken: data.isResetPasswordTokenValid ? resetPasswordToken : null,
    posts: posts.data
  }
}

PasswordReset.propTypes = {
  resetPasswordToken: PropTypes.string,
  posts: PropTypes.object.isRequired
}

export default PasswordReset
