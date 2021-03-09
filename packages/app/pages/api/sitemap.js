import { createSitemap, EnumChangefreq } from 'sitemap'
import { getPostsTags } from '@services/post'
import { getAllPlaces, getAllPosts, getAllUsers } from '@services/sitemap'

export default async (req, res) => {
  const sitemap = createSitemap({
    hostname: 'https://www.digitalnomads.dev'
  })

  // Add any static entries here
  sitemap.add({ url: '/', changefreq: EnumChangefreq.DAILY })
  sitemap.add({ url: '/places', changefreq: EnumChangefreq.DAILY })
  sitemap.add({ url: '/users', changefreq: EnumChangefreq.DAILY })

  // Add dynamic entries

  // Posts
  const { data: posts } = await getAllPosts()
  for (const post of posts) {
    sitemap.add({ url: `/post/${post._id}`, changefreq: EnumChangefreq.DAILY })
  }

  // // Posts Tags
  const tagsResponse = await getPostsTags()
  const tags = tagsResponse.data
  for (const tag of tags) {
    sitemap.add({ url: `/posts/t/${tag._id}`, changefreq: EnumChangefreq.DAILY })
  }

  // Users
  const { data: users } = await getAllUsers()
  for (const user of users) {
    sitemap.add({ url: `/${user.username}`, changefreq: EnumChangefreq.DAILY })
  }

  // Places
  const { data: places } = await getAllPlaces()
  for (const place of places) {
    sitemap.add({
      url: `/place/${place.shortId}/${place.urlSlug}`,
      changefreq: EnumChangefreq.DAILY
    })
  }

  res.setHeader('Content-Type', 'application/xml')
  res.send(sitemap.toString())
}
