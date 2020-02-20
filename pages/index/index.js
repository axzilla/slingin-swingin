import { Main as MainLayout } from '@layouts'
import { Landing as LandingView } from '@views'
import { SeoMeta } from '@components'

function Landing() {
  return (
    <>
      <SeoMeta
        title={'noize.dev - Gemeinsam werden wir bessere Entwickler'}
        desc={
          'noize.dev ist Plattform für den deutschsprachigen Raum, auf der Softwareentwickler Artikel schreiben, an Diskussionen teilnehmen und ihre beruflichen Profile erstellen.'
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
