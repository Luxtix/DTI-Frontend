import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|assets|images|favicon.ico|event|sign-in|sign-up|events).*)',
  ],
}
export default auth((req) => {
  const reqUrl = new URL(req.url)
  if (
    !req.auth &&
    reqUrl?.pathname !== '/' &&
    reqUrl?.pathname !== '/sign-in'
  ) {
    return NextResponse.redirect(new URL(`/sign-in`, req.url))
  }

  if (req.auth?.user.role == 'USER' && reqUrl?.pathname == '/dashboard') {
    return NextResponse.redirect(new URL('/', req.url))
  }
})
