// converts a simple object ({ a: 'b' }) into a query string ('a=b'), needed because of Next.js

function objToQuery(object) {
  const queryString = Object.keys(object)
    .map(key => key + '=' + object[key])
    .join('&')

  return queryString
}

export default objToQuery
