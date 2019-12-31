import { createSitemap, EnumChangefreq } from 'sitemap'
import { getPosts, getPostsTags } from '../../services/post'
import { getAllProfiles } from '../../services/profile'

export default async (req, res) => {
  const sitemap = createSitemap({
    hostname: 'http://www.codehustla.dev'
  })

  // Add any static entries here
  sitemap.add({ url: '/', changefreq: EnumChangefreq.DAILY })

  // Add dynamic entries

  // Posts
  const postsResponse = await getPosts()
  const posts = postsResponse.data
  for (const post of posts) {
    sitemap.add({ url: `/post/${post.shortId}/${post.urlSlug}`, changefreq: EnumChangefreq.DAILY })
  }

  // Posts Tags
  const tagsResponse = await getPostsTags()
  const tags = tagsResponse.data
  for (const tag of tags) {
    sitemap.add({ url: `/posts/t/${tag._id}`, changefreq: EnumChangefreq.DAILY })
  }

  // Profiles
  const profileResponse = await getAllProfiles()
  const profiles = profileResponse.data
  for (const profile of profiles) {
    sitemap.add({ url: `/${profile.handle}`, changefreq: EnumChangefreq.DAILY })
  }

  res.setHeader('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
