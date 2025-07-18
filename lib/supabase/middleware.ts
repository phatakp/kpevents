/** biome-ignore-all lint/complexity/noForEach: <no> */
/** biome-ignore-all lint/nursery/useIterableCallbackReturn: <no> */
import { type NextRequest, NextResponse } from 'next/server';

export function updateSession(request: NextRequest) {
  const supabaseResponse = NextResponse.next({
    request,
  });

  // const supabase = createServerClient<Database>(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  //   {
  //     cookies: {
  //       getAll() {
  //         return request.cookies.getAll();
  //       },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value }) =>
  //           request.cookies.set(name, value)
  //         );
  //         supabaseResponse = NextResponse.next({
  //           request,
  //         });
  //         cookiesToSet.forEach(({ name, value, options }) =>
  //           supabaseResponse.cookies.set(name, value, options)
  //         );
  //       },
  //     },
  //   }
  // );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  // const resp = await fetch('/api/profile');
  // const user: User | null = await resp.json();

  // if (!user && ['/admin', '/profile'].includes(request.nextUrl.pathname)) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone();
  //   url.pathname = '/auth/login';
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
