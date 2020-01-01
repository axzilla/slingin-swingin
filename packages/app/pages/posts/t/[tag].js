import PropTypes from 'prop-types'

import { Main as MainLayout } from '../../../layouts'
import { PostFeedByTag as PostFeedByTagView } from '../../../views'
import { SeoMeta } from '../../../components'

function postsByTag({ tag }) {
  return (
    <>
      <SeoMeta
        title={`${tag} - codehustla.dev - Gemeinsam werden wir bessere Entwickler`}
        desc={`codehustla.dev - Hier dreht sich alles um ${tag}`}
        canonical={`https://www.codehustla.dev/posts/t/${tag}`}
      />
      <MainLayout>
        <PostFeedByTagView tag={tag} />
      </MainLayout>
    </>
  )
}

postsByTag.getInitialProps = ({ query }) => {
  const { tag } = query
  return { tag }
}

postsByTag.propTypes = {
  tag: PropTypes.object
}

export default postsByTag
