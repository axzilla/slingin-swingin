// Packages
import PropTypes from 'prop-types'

// Global Components
import Topbar from '@components/Topbar'
import Container from '@components/Container'
import WidgetLatestUsers from '@components/WidgetLatestUsers'
import WidgetTopPostsTags from '@components/WidgetTopPostsTags'
import BottomNavigationHack from '@components/BottomNavigationHack'

// Local Components
import Footer from './components/Footer'

// MUI
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

function Main({ children }) {
  return (
    <Grid container>
      <Topbar />
      <Container maxWidth="lg">
        <Grid container direction="row" justify="center" alignItems="flex-start" spacing={2}>
          <Box clone order={{ xs: 2, md: 1 }}>
            <Grid item xs={12} md={3}>
              <WidgetTopPostsTags />
            </Grid>
          </Box>

          <Box clone order={{ xs: 1, md: 2 }}>
            <Grid item xs={12} md={6}>
              {children}
            </Grid>
          </Box>

          <Box clone order={{ xs: 3, md: 3 }}>
            <Grid item xs={12} md={3}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <WidgetLatestUsers />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Container>
      <Footer />
      <BottomNavigationHack />
    </Grid>
  )
}

Main.propTypes = {
  children: PropTypes.node
}

export default Main
