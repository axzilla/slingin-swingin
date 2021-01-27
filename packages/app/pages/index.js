// Packages
import PropTypes from 'prop-types'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Landing as LandingView } from '@views'

// Services
import { getPosts } from '@services/post'

// Utils
import objToQuery from '@utils/objToQuery'

// Global Components
import { SeoMeta } from '@components'

function Landing({ posts }) {
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
        <LandingView posts={posts} />
      </MainLayout>
    </>
  )
}

Landing.getInitialProps = async ({ res, query }) => {
  try {
    const { data } = await getPosts(objToQuery(query))
    return { posts: data }
  } catch (error) {
    if (error) {
      res.writeHead(302, { Location: '/not-found' })
      res.end()
    }
  }
}

Landing.propTypes = {
  posts: PropTypes.object.isRequired
}

export default Landing
