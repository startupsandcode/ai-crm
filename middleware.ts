import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Debug: Log all cookies
  console.log('All cookies:', request.cookies.getAll().map(c => ({ name: c.name, value: c.value.substring(0, 20) + '...' })))

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          const value = request.cookies.get(name)?.value
          console.log(`Getting cookie ${name}:`, value ? 'exists' : 'missing')
          return value
        },
        set(name: string, value: string, options: CookieOptions) {
          console.log(`Setting cookie ${name}`)
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          console.log(`Removing cookie ${name}`)
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  try {
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    console.log('Middleware - Path:', request.nextUrl.pathname)
    console.log('Middleware - User:', user?.email || 'No user')
    console.log('Middleware - Error:', error)

    const protectedPaths = ['/dashboard']
    const pathIsProtected = protectedPaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    )

    if (pathIsProtected && !user) {
      console.log('Redirecting to login from:', request.nextUrl.pathname)
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirectedFrom', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return response
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
