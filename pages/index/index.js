import { Main as MainLayout } from '@layouts'
import { Landing as LandingView } from '@views'
import { SeoMeta } from '@components'

function Landing() {
  return (
    <>
      <SeoMeta
        title={'noize.dev - The #1 Music Production Community'}
        desc={
          'noize.dev (or just NOIZE) is a platform where any kind of music producer write articles, take part in discussions, and build their professional profiles.'
        }
        canonical="https://www.noize.dev"
      />
      <MainLayout>
        <LandingView />
      </MainLayout>
    </>
  )
}

export default Landing
