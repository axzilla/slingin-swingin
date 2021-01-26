// Utils
import { isNotLoggedIn } from '@utils/initialize'

// Global COmponents
import { Topbar, Container } from '@components'

// Views
import { AccountSettings as AccountSettingsView } from '@views'

function AccountSettings() {
  return (
    <>
      <Topbar />
      <Container>
        <AccountSettingsView />
      </Container>
    </>
  )
}

AccountSettings.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default AccountSettings
