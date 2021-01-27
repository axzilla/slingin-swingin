// Packages
import PropTypes from 'prop-types'

// Utils
import objToQuery from '@utils/objToQuery'

// Services
import { getAllUsers } from '@services/user'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Users as UsersView } from '@views'

function Users({ users }) {
  return (
    <MainLayout>
      <UsersView users={users} />
    </MainLayout>
  )
}

Users.getInitialProps = async ({ ctx, query }) => {
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

Users.propTypes = {
  users: PropTypes.array.isRequired
}

export default Users
