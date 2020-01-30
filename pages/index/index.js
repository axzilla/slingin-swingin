import { Main as MainLayout } from '../../layouts'
import { Landing as LandingView } from '../../views'

import { SeoMeta } from '../../components'

function landing() {
  return (
    <>
      <SeoMeta
        title={'bounce.dev - Gemeinsam werden wir bessere Entwickler'}
        desc={
          'bounce.dev ist Plattform für den deutschsprachigen Raum, auf der Softwareentwickler Artikel schreiben, an Diskussionen teilnehmen und ihre beruflichen Profile erstellen.'
        }
        canonical="https://www.bounce.dev"
      />
      <MainLayout>
        <LandingView />
      </MainLayout>
    </>
  )
}

export default landing
