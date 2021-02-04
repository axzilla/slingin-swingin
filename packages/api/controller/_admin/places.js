const axios = require('axios')

async function conversationsGetByUserId(req, res) {
  try {
    const url =
      'https://www.airbnb.de/api/v2/autocompletes?country=DE&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=de&locale=de&num_results=5&user_input=canggu&api_version=1.2.0&satori_config_token=EhIiQhIiIhUAIhISMhIhEhIiUkI1JBUKFQgVAgA&vertical_refinement=homes&region=-1&options=should_filter_by_vertical_refinement|hide_nav_results|should_show_stays|simple_search'

    const headers = {
      // GET /api/v2/autocompletes?country=IL&key=d306zoyjsyarp7ifhu67rjxn52tv0t20&language=de&locale=de&num_results=5&user_input=Canggu%2C%20Badung%2C%20Bali%2C%20Indonesien&api_version=1.2.0&satori_config_token=EhIiQhIiIhUAIhISMhIhEhIiUkJFChUIFQIA&vertical_refinement=homes&region=-1&options=should_filter_by_vertical_refinement%7Chide_nav_results%7Cshould_show_stays%7Csimple_search HTTP/2
      Host: 'www.airbnb.de',
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:85.0) Gecko/20100101 Firefox/85.0',
      Accept: 'application/json, text/javascript, */*; q=0.01',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Referer:
        'https://www.airbnb.de/s/Canggu--Badung--Bali--Indonesien/homes?tab_id=home_tab&refinement_paths%5B%5D=%2Fhomes&date_picker_type=calendar&query=Canggu%2C%20Badung%2C%20Bali%2C%20Indonesien&place_id=ChIJZZZY9GE40i0RMP2CyvsLAwU&checkin=2021-02-04&checkout=2021-02-06&source=structured_search_input_header&search_type=autocomplete_click',
      'X-CSRF-Token': 'V4$.airbnb.de$ti1aLSKHoaM$IuPodZUEjVWRvUTc6ZFutXjCHRUCeYdZJrxnkCmmRag=',
      'X-CSRF-Without-Token': 1,
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      Cookie:
        'bev=1608722037_MzIzMjAxNTJjNmZh; cdn_exp_90092ce611da834e8=control; frmfctr=wide; __ssid=5577c5da9b7ef4f00ba7074c402de68; OptanonConsent=landingPath=NotLandingPage&datestamp=Mon+Jan+18+2021+11%3A00%3A49+GMT%2B0100+(Central+European+Standard+Time)&version=4.6.0&groups=0_179751%3A1%2C1%3A1%2C2%3A1%2C0_183217%3A1%2C3%3A1%2C0_183345%3A1%2C0_183219%3A1%2C4%3A1%2C0_183240%3A1%2C0_179739%3A1%2C0_179743%3A1%2C0_185813%3A1%2C0_183096%3A1%2C0_179755%3A1%2C0_183215%3A1%2C0_185808%3A1%2C0_179747%3A1%2C0_179740%3A1%2C0_179744%3A1%2C0_185810%3A1%2C0_185814%3A1%2C0_183097%3A1%2C0_179756%3A1%2C0_183216%3A1%2C0_183344%3A1%2C0_185809%3A1%2C0_179748%3A1%2C0_179752%3A1%2C0_183241%3A1%2C0_179741%3A1%2C0_183098%3A1%2C0_179745%3A1%2C0_183346%3A1%2C0_185811%3A1%2C0_179737%3A1%2C0_179757%3A1%2C0_179749%3A1%2C0_179753%3A1%2C0_185831%3A1%2C0_183099%3A1%2C0_179738%3A1%2C0_179742%3A1%2C0_183095%3A1%2C0_183243%3A1%2C0_179754%3A1%2C0_183214%3A1%2C0_179750%3A1%2C0_185815%3A1%2C0_185816%3A1&AwaitingReconsent=false; cfrmfctr=MOBILE; OptanonAlertBoxClosed=2020-12-23T11:14:28.302Z; _gcl_au=1.1.167545642.1608722068; _ga=GA1.2.1430703544.1608722069; sdid=; _airbed_session_id=84cc2e672f1e5df5e46c906bb866e9dc; abb_fa2=%7B%22user_id%22%3A%2246%7C1%7CeV4GvXVT42r9Yu1%2BhsWWowEg%2BY5V8fRg8y5OeQq6cr2I%2BOfZl%2BE1PBM%3D%22%7D; rclu=%7B%22151931173%22%3D%3E%22bBxpq5H2UCDnRtG1xsQGHQGzNWzE04aGjxFr2oF8eLk%3D%22%7D; rclmd=%7B%22151931173%22%3D%3E%22facebook%22%7D; hli=1; har=1; cdn_exp_1c2fc9c452b263945=treatment; tzo=60; amplitude_id_cb82620a40fd4087c9928deaa540a3d0airbnb.de=eyJkZXZpY2VJZCI6ImEwNjZlYzBjLTBjODgtNDQ1OC1hNzQ1LWY1MGI2NzBkOTAyOFIiLCJ1c2VySWQiOm51bGwsIm9wdE91dCI6ZmFsc2UsInNlc3Npb25JZCI6MTYxMDgwMTQ1NjI4MiwibGFzdEV2ZW50VGltZSI6MTYxMDgwMTQ1NjI4MSwiZXZlbnRJZCI6MCwiaWRlbnRpZnlJZCI6MSwic2VxdWVuY2VOdW1iZXIiOjF9; fbm_138566025676=base_domain=.airbnb.de; fblo_138566025676=y; cdn_exp_194c36fab8e6a6772=control; cdn_exp_75142abeb19c4bc33=treatment; cdn_exp_194_exposure_group=88; jitney_client_session_id=22f281ee-eeb8-4a26-b1f6-75640ba3899c; jitney_client_session_created_at=1612432662; jitney_client_session_updated_at=1612434036; previousTab=%7B%22id%22%3A%2297be8fe8-acd1-4d9a-af1c-dca0853b1252%22%2C%22url%22%3A%22https%3A%2F%2Fwww.airbnb.de%2Fs%2FCanggu--Badung--Bali--Indonesien%2Fhomes%3Ftab_id%3Dhome_tab%26refinement_paths%255B%255D%3D%252Fhomes%26date_picker_type%3Dcalendar%26query%3DCanggu%252C%2520Badung%252C%2520Bali%252C%2520Indonesien%26place_id%3DChIJZZZY9GE40i0RMP2CyvsLAwU%26checkin%3D2021-02-04%26checkout%3D2021-02-06%26source%3Dstructured_search_input_header%26search_type%3Dautocomplete_click%22%7D; _csrf_token=V4%24.airbnb.de%24ti1aLSKHoaM%24IuPodZUEjVWRvUTc6ZFutXjCHRUCeYdZJrxnkCmmRag%3D; google_logout=1; _pt=1--WyJlMDkzODM5MTk1ZmVmZjAzMWM5Nzg5YWQ4ODU3ZTNkOTEwZDBjMzJjIl0%3D--7ac09cdddd537039380d3e176e70e4be72c69d94; has_logged_out=true; _user_attributes=%7B%22curr%22%3A%22EUR%22%2C%22guest_exchange%22%3A0.83118%2C%22device_profiling_session_id%22%3A%221608722038--802a8d539d1a02d45d3bf7d4%22%2C%22giftcard_profiling_session_id%22%3A%221612430805--1e176e4549127d6d1a200629%22%2C%22reservation_profiling_session_id%22%3A%221612430805--38a484fe33de4e71e88f9f41%22%7D; __svt=795; flags=0; auth_jitney_session_id=ab4c6e89-8462-4d58-b6be-b7b182a3a218; _gid=GA1.2.1526777580.1612430806; _gat=1; cbkp=2'
    }

    const result = await axios.get(url, { headers })
    res.json(result.data)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = conversationsGetByUserId
