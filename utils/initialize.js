import { parseCookies } from 'nookies'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../utils/setAuthToken'

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

function isServerSide(ctx) {
  return ctx.res && ctx.res.redirect
}

function serverRedirect(ctx, path) {
  return ctx.res.redirect(path)
}

function clientRedirect(path) {
  return window.location.replace(path)
}

export function isLoggedIn(ctx) {
  if (isValidToken(ctx)) {
    isServerSide(ctx) ? serverRedirect(ctx, '/') : clientRedirect('/')
  }
}

export function isNotLoggedIn(ctx) {
  if (!isValidToken(ctx)) {
    return isServerSide(ctx) ? serverRedirect(ctx, '/login') : clientRedirect('/login')
  }
}
