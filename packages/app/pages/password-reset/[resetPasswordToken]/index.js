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

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Landing as LandingView } from '@views'

// Global Components
import { SeoMeta } from '@components'

function PasswordReset({ resetPasswordToken }) {
  const dispatch = useDispatch()
  const { setAlert } = useAlert()

  useEffect(() => {
    if (resetPasswordToken) {
      dispatch(authModalReducer({ isOpen: true, type: 'ResetPassword' }))
    } else {
      dispatch(authModalReducer({ isOpen: true, type: 'ForgotPassword' }))
      setAlert({ message: `Your request to reset password has already expired. Please try again.` })
    }
  }, [])

  return (
    <>
      <SeoMeta
        title={'noize.dev - The #1 Music Production Community'}
        desc={
          'noize.dev (or just NOIZE) is a platform where any kind of music producer write articles, take part in discussions, and build their professional profiles.'
        }
        canonical="https://www.noize.dev"
        ogImage={null}
      />
      <MainLayout>
        <LandingView />
      </MainLayout>
    </>
  )
}

PasswordReset.getInitialProps = async ({ query, res }) => {
  try {
    // if token is not valid redirect to /reset-password and so on
    const { resetPasswordToken } = query
    const { data } = await passwordResetValidation(resetPasswordToken)

    return { resetPasswordToken: data.isResetPasswordTokenValid ? resetPasswordToken : null }
  } catch (error) {
    if (error) {
      res.writeHead(302, { Location: '/reset-password' })
      res.end()
    }
  }
}

PasswordReset.propTypes = {
  resetPasswordToken: PropTypes.string
}

export default PasswordReset
