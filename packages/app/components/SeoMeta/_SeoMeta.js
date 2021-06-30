import Head from 'next/head'
import PropTypes from 'prop-types'
import logo from './_ogLogo.jpg'

function seoMeta({ title, desc, canonical, ogImage, ogTitle, ogDescription }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:url" content={canonical} />
      <meta
        property="og:image"
        content={
          ogImage ||
          `https://sevier-dirt-slingin-and-swingin.vercel.app
${logo}`
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </Head>
  )
}

seoMeta.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string
}

export default seoMeta
