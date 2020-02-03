import { isNotLoggedIn } from '@utils/initialize'
import { Dashboard as DashboardLayout } from '@layouts'
import { DashboardOverview as DashboardOverviewView } from '@views'

function Overview() {
  return (
    <DashboardLayout>
      <DashboardOverviewView />
    </DashboardLayout>
  )
}

Overview.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  // https://err.sh/zeit/next.js/empty-object-getInitialProps
  return { undefined }
}

export default Overview
