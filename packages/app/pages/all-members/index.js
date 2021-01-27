// Packages
import PropTypes from 'prop-types'

// Utils
import objToQuery from '@utils/objToQuery'

// Services
import { getAllUsers } from '@services/user'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { AllMembers as AllMembersView } from '@views'

function AllMembers({ users }) {
  return (
    <MainLayout>
      <AllMembersView users={users} />
    </MainLayout>
  )
}

AllMembers.getInitialProps = async ({ ctx, query }) => {
  try {
    const { data } = await getAllUsers(objToQuery(query))
    return { users: data }
  } catch (error) {
    if (error) {
      ctx.res.writeHead(302, { Location: '/not-found' })
      ctx.res.end()
    }
  }
}

AllMembers.propTypes = {
  users: PropTypes.array.isRequired
}

export default AllMembers
