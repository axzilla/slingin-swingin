// Packages
import PropTypes from 'prop-types'

// Utils
import objToQuery from '@utils/objToQuery'

// Global Components
// import { SeoMeta } from '@components'

// Services
import { getAllUsers } from '@services/user'

// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { Users as UsersView } from '@views'

function Users({ users }) {
  return (
    <>
      {/* <SeoMeta
        title={`Make new friends around the world - digitalnomads.dev`}
        desc={`digitalnomads.dev - Make new friends around the world`}
        canonical={`https://www.digitalnomads.dev/users`}
        ogImage={null}
      /> */}
      <MainLayout>
        <UsersView users={users} />
      </MainLayout>
    </>
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
  users: PropTypes.object.isRequired
}

export default Users
