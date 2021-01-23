import { parseCookies } from 'nookies'
import setAuthToken from '@utils/setAuthToken'

function isValidToken(ctx) {
  const { jwtToken } = parseCookies(ctx)

  if (jwtToken) {
    setAuthToken(jwtToken)
    return true
  } else {
    return false
  }
}

export function isLoggedIn(ctx) {
  if (isValidToken(ctx) && ctx.res) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
}

export function isNotLoggedIn(ctx) {
  if (!isValidToken(ctx) && ctx.res) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
  }
}
