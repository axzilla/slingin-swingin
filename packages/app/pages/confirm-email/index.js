// Packages
import PropTypes from 'prop-types'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Landing as LandingView } from '@views'

// Services
import { activateAccount } from '@services/auth'
import { getPosts } from '@services/post'

// Utils
import objToQuery from '@utils/objToQuery'

// Global Components
import { SeoMeta } from '@components'

function ConfirmEmail({ message, variant, jwtToken, posts }) {
  return (
    <>
      <SeoMeta
        title={'digitalnomads.dev - The #1 Music Production Community'}
        desc={
          'digitalnomads.dev (or just dino) is a platform where any kind of music producer write articles, take part in discussions, and build their professional profiles.'
        }
        canonical="https://www.digitalnomads.dev"
        ogImage={null}
      />
      <MainLayout>
        <LandingView message={message} variant={variant} jwtToken={jwtToken} posts={posts} />
      </MainLayout>
    </>
  )
}

ConfirmEmail.getInitialProps = async ({ query }) => {
  const { token } = query
  const posts = await getPosts(objToQuery(query))
  const activatedAccount = await activateAccount({ token })
  const { message, variant, jwtToken } = activatedAccount.data

  return { message, variant, jwtToken, posts: posts.data }
}

ConfirmEmail.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  jwtToken: PropTypes.string.isRequired,
  posts: PropTypes.object.isRequired
}

export default ConfirmEmail
