import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'
import setAuthToken from '@utils/setAuthToken'

function isValidToken(ctx) {
  const { jwtToken } = parseCookies(ctx)
  setAuthToken(jwtToken)

  if (jwtToken) {
    const decodedUser = jwtDecode(jwtToken)
    const currentTime = Date.now() / 1000

    return decodedUser.exp > currentTime
  }

  return false
}

export function isLoggedIn(ctx) {
  if (isValidToken(ctx) && ctx.res) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
}

export function isNotLoggedIn(ctx) {
  if (!isValidToken(ctx) && ctx.res) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
  }
}
