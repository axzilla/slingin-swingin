import { Main as MainLayout } from '../../layouts'
import { NotFound as NotFoundView } from '../../views'

function notFound() {
  return (
    <MainLayout>
      <NotFoundView />
    </MainLayout>
  )
}

export default notFound
