import { isNotLoggedIn } from '../../../utils/initialize'

import { Dashboard as DashboardLayout } from '../../../layouts'
import { DashboardOverview as DashboardOverviewView } from '../../../views'

function Overview() {
  return (
    <DashboardLayout>
      <DashboardOverviewView />
    </DashboardLayout>
  )
}

Overview.getInitialProps = ctx => {
  isNotLoggedIn(ctx)
  return {}
}

export default Overview
