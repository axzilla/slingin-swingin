import { createSitemap, EnumChangefreq } from 'sitemap'
import { getPosts } from '../../components/post/_services'

export default async (req, res) => {
  const sitemap = createSitemap({
    hostname: 'http://www.codehustla.dev'
  })

  // Add any static entries here
  sitemap.add({ url: '/', changefreq: EnumChangefreq.DAILY })

  // To add dynamic entries
  const response = await getPosts()
  const posts = response.data
  for (const post of posts) {
    sitemap.add({ url: `/post/${post.shortId}/${post.urlSlug}`, changefreq: EnumChangefreq.DAILY })
  }

  // res.contentType('application/xml')
  res.setHeader('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
