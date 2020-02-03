import Head from 'next/head'
import PropTypes from 'prop-types'

const seoMeta = ({ title, desc, canonical }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={desc} />
    <link rel="canonical" href={canonical} />
  </Head>
)

seoMeta.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  canonical: PropTypes.string
}

export default seoMeta
