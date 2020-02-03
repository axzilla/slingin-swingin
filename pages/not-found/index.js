import { Main as MainLayout } from '@layouts'
import { NotFound as NotFoundView } from '@views'

function NotFound() {
  return (
    <MainLayout>
      <NotFoundView />
    </MainLayout>
  )
}

export default NotFound
