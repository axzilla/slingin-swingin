// Packages
const Scraper = require('images-scraper')

async function getPlaceImages(req, res) {
  try {
    const { search } = req.params

    const google = new Scraper({
      puppeteer: { headless: true, args: ['--no-sandbox'] },
      tbs: { isz: 'l' }
      // itp:  // options: clipart, face, lineart, news, photo
      // ic:   // options: color, gray, trans
      // sur:  // options: fmc (commercial reuse with modification), fc (commercial reuse), fm (noncommercial reuse with modification), f (noncommercial reuse)
    })

    const limit = 12
    const images = await google.scrape(search, limit)

    res.json(images)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceImages
