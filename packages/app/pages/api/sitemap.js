import { createSitemap, EnumChangefreq } from 'sitemap'
import { getPosts, getPostsTags } from '@services/post'
import { getAllUsers } from '@services/user'
import { getAllPlaces } from '@services/place'

export default async (req, res) => {
  const sitemap = createSitemap({
    hostname: 'http://www.digitalnomads.dev'
  })

  // Add any static entries here
  sitemap.add({ url: '/', changefreq: EnumChangefreq.DAILY })
  sitemap.add({ url: '/places', changefreq: EnumChangefreq.DAILY })
  sitemap.add({ url: '/users', changefreq: EnumChangefreq.DAILY })

  // Add dynamic entries

  // Posts
  const postsResponse = await getPosts()
  const posts = postsResponse.data.result
  for (const post of posts) {
    sitemap.add({ url: `/post/${post.shortId}/${post.urlSlug}`, changefreq: EnumChangefreq.DAILY })
  }

  // Posts Tags
  const tagsResponse = await getPostsTags()
  const tags = tagsResponse.data
  for (const tag of tags) {
    sitemap.add({ url: `/posts/t/${tag._id}`, changefreq: EnumChangefreq.DAILY })
  }

  // Users
  const userResponse = await getAllUsers()
  const users = userResponse.data.result
  for (const user of users) {
    sitemap.add({ url: `/${user.username}`, changefreq: EnumChangefreq.DAILY })
  }

  // Places
  const placeResponse = await getAllPlaces()
  const places = placeResponse.data.result
  for (const place of places) {
    sitemap.add({
      url: `/place/${place.shortId}/${place.urlSlug}`,
      changefreq: EnumChangefreq.DAILY
    })
  }

  res.setHeader('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
