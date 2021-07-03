// Layouts
import { Main as MainLayout } from '@layouts'

// Views
import { TreasuryFeed as TreasuryFeedView } from '@views'

function TreasuryFeed() {
  return (
    <>
      <MainLayout>
        <TreasuryFeedView />
      </MainLayout>
    </>
  )
}

export default TreasuryFeed
