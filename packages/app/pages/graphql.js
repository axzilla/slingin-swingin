// Packages
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const client = new ApolloClient({
  // uri: 'https://api.spacex.land/graphql/',
  uri: 'http://localhost:5000/',
  cache: new InMemoryCache()
})

function Graphql() {
  return <>Hello</>
}

Graphql.getInitialProps = async () => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetLaunches {
          launchesPast(limit: 10) {
            id
            mission_name
            launch_date_local
            launch_site {
              site_name_long
            }
            links {
              article_link
              video_link
              mission_patch
            }
            rocket {
              rocket_name
            }
          }
        }
      `
    })

    console.log(data) // eslint-disable-line
    return { a: 'b' }
  } catch (error) {
    console.log(error) // eslint-disable-line
  }
}

// Graphql.propTypes = {
//   posts: PropTypes.object.isRequired
// }

export default Graphql
