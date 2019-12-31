import Landing from '../components/layout/Landing'
import SeoMeta from '../components/common/SeoMeta'

function landing() {
  return (
    <>
      <SeoMeta
        title={'codehustla.dev - Gemeinsam werden wir bessere Entwickler'}
        desc={
          'codehustla.dev ist Plattform für den deutschsprachigen Raum, auf der Softwareentwickler Artikel schreiben, an Diskussionen teilnehmen und ihre beruflichen Profile erstellen.'
        }
        canonical="https://www.codehustla.dev"
      />
      <Landing />
    </>
  )
}

export default landing
