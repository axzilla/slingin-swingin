// import { createSitemap, EnumChangefreq } from 'sitemap'
import { SitemapStream, streamToPromise } from 'sitemap'
// import { getPostsTags } from '@services/post'
import { getAllPosts } from '@services/sitemap'
// import { getAllPlaces, getAllPosts, getAllUsers } from '@services/sitemap'

export default async (req, res) => {
  // const sitemap = createSitemap({
  //   hostname: 'https://www.digitalnomads.dev'
  // })
  const smStream = new SitemapStream({
    hostname: `https://www.digitalnomads.dev`,
    cacheTime: 600000
  })

  // // Add any static entries here
  // sitemap.add({ url: '/', changefreq: EnumChangefreq.DAILY })
  // sitemap.add({ url: '/places', changefreq: EnumChangefreq.DAILY })
  // sitemap.add({ url: '/users', changefreq: EnumChangefreq.DAILY })

  // Add dynamic entries

  // Posts
  const { data: posts } = await getAllPosts()
  for (const post of posts) {
    smStream.write({
      url: `/post/${post._id}`,
      changefreq: 'daily',
      priority: 0.9
    })
    // sitemap.add({ url: `/post/${post._id}`, changefreq: EnumChangefreq.DAILY })
  }

  // // // Posts Tags
  // const tagsResponse = await getPostsTags()
  // const tags = tagsResponse.data
  // for (const tag of tags) {
  //   sitemap.add({ url: `/posts/t/${tag._id}`, changefreq: EnumChangefreq.DAILY })
  // }

  // // Users
  // const { data: users } = await getAllUsers()
  // for (const user of users) {
  //   sitemap.add({ url: `/${user.username}`, changefreq: EnumChangefreq.DAILY })
  // }

  // // Places
  // const { data: places } = await getAllPlaces()
  // for (const place of places) {
  //   sitemap.add({
  //     url: `/place/${place.shortId}/${place.urlSlug}`,
  //     changefreq: EnumChangefreq.DAILY
  //   })
  // }

  // End sitemap stream
  smStream.end()

  // XML sitemap string
  const sitemapOutput = (await streamToPromise(smStream)).toString()

  // Change headers
  res.writeHead(200, {
    'Content-Type': 'application/xml'
  })

  res.end(sitemapOutput)
  // res.setHeader('Content-Type', 'application/xml')
  // res.end(sitemap.toString())
}
