import { createSitemap, EnumChangefreq } from 'sitemap'
import { getPosts, getPostsTags } from '@services/post'
import { getAllUsers } from '@services/user'

export default async (req, res) => {
  const sitemap = createSitemap({
    hostname: 'http://www.noize.dev'
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
  const userResponse = await getAllUsers()
  const users = userResponse.data
  for (const user of users) {
    sitemap.add({ url: `/${user.username}`, changefreq: EnumChangefreq.DAILY })
  }

  res.setHeader('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
