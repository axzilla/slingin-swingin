// Packages
const Scraper = require('images-scraper')

async function getPlaceImages(req, res) {
  try {
    const { search } = req.params

    const google = new Scraper({
      puppeteer: { headless: true, args: ['--no-sandbox'] },
      tbs: { isz: 'l' }
    })

    const limit = 12
    const images = await google.scrape(search, limit)

    res.json(images)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceImages
