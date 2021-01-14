// Packages
const Scraper = require('images-scraper')

async function getPlacePhotos(req, res) {
  try {
    const google = new Scraper({
      puppeteer: { headless: true, args: ['--no-sandbox'] },
      tbs: { isz: 'l' }
    })
    const results = await google.scrape(req.params.urlSlug, 50)
    res.json(results)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlacePhotos
