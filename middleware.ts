import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/',
    '/events',
    '/events/:id',
    '/events/:id/transactions',
    '/dashboard',
    '/create-event',
    '/profile',
    '/order-success',
    '/interested',
    '/sign-in',
    '/sign-up',
    '/purchased-tickets',
  ],
}
export default auth((req) => {
  const reqUrl = new URL(req.url)
  const path = reqUrl.pathname

  console.log(req.auth?.user.role)
  const publicRoutes = ['/', '/events', '/sign-in', '/sign-up']
  if (publicRoutes.includes(path) || path.startsWith('/events/')) {
    return NextResponse.next()
  }

  if (!req.auth) {
    return NextResponse.redirect(new URL('/sign-in', req.url))
  }

  const { role } = req.auth.user

  if (role === 'ORGANIZER') {
    const organizerRoutes = ['/dashboard', '/create-event', '/profile']
    if (!organizerRoutes.includes(path)) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
  }

  if (role === 'USER') {
    const userRoutes = [
      '/',
      '/events',
      '/profile',
      '/order-success',
      '/interested',
      '/purchased-tickets',
    ]
    if (
      !userRoutes.includes(path) &&
      !path.match(/^\/events\/[^/]+$/) &&
      !path.match(/^\/events\/[^/]+\/transactions$/)
    ) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }
  return NextResponse.next()
})
