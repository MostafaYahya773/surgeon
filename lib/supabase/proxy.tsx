import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // إنشاء Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },

        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // مهم جدًا عشان يحافظ على الـ session
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  // لو مفيش user → حوله للوجين
  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/Login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone();

    url.pathname = '/auth/Login';

    return NextResponse.redirect(url);
  }

  // لو فيه user وحاول يدخل صفحة اللوجين → حوله للدashboard
  if (user && request.nextUrl.pathname.startsWith('/auth/Login')) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
