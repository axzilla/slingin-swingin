// Packages
import PropTypes from 'prop-types'

// Services
import { getAllProfiles } from '@services/profile'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { AllMembers as AllMembersView } from '@views'

function AllMembers({ profiles }) {
  return (
    <MainLayout>
      <AllMembersView profiles={profiles} />
    </MainLayout>
  )
}

AllMembers.getInitialProps = async ctx => {
  try {
    const { data } = await getAllProfiles()
    return { profiles: data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

AllMembers.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default AllMembers
