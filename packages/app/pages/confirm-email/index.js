// Packages
import PropTypes from 'prop-types'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Landing as LandingView } from '@views'

// Services
import { activateAccount } from '@services/auth'

// Global Components
import { SeoMeta } from '@components'

function ConfirmEmail({ message, variant, jwtToken }) {
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
        <LandingView message={message} variant={variant} jwtToken={jwtToken} />
      </MainLayout>
    </>
  )
}

ConfirmEmail.getInitialProps = async ({ query }) => {
  const { token } = query
  const { data } = await activateAccount({ token })
  const { message, variant, jwtToken } = data

  return { message, variant, jwtToken }
}

ConfirmEmail.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  jwtToken: PropTypes.string.isRequired
}

export default ConfirmEmail
