'use client'

import { createClient } from '@/lib/supabase/client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Blob1, Blob2, Blob3 } from '@/components/blobs'

export default function Login() {
  const supabase = createClient()

  const customTheme = {
    ...ThemeSupa,
    default: {
      ...ThemeSupa.default,
      colors: {
        ...ThemeSupa.default.colors,
        brand: 'hsl(var(--primary))',
        brandAccent: 'hsl(var(--primary))',
        brandButtonText: 'hsl(var(--primary-foreground))',
        defaultButtonBackground: 'hsl(var(--card))',
        defaultButtonBackgroundHover: 'hsl(var(--muted))',
        defaultButtonBorder: 'hsl(var(--border))',
        defaultButtonText: 'hsl(var(--foreground))',
        inputBackground: 'hsl(var(--background))',
        inputBorder: 'hsl(var(--border))',
        inputBorderHover: 'hsl(var(--border))',
        inputBorderFocus: 'hsl(var(--ring))',
        inputText: 'hsl(var(--foreground))',
        inputLabelText: 'hsl(var(--muted-foreground))',
        inputPlaceholder: 'hsl(var(--muted-foreground))',
      },
      radii: {
        borderRadiusButton: '2rem',
        buttonBorderRadius: '2rem',
        inputBorderRadius: '2rem',
      },
      space: {
        ...ThemeSupa.default.space,
        buttonPadding: '1rem 1.5rem',
        inputPadding: '1rem 1.5rem',
      }
    },
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <Blob1 />
      <Blob2 />
      <Blob3 />
      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="text-center">
          <CardTitle>Welcome Back!</CardTitle>
          <CardDescription>Sign in to continue building your habits.</CardDescription>
        </CardHeader>
        <CardContent>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: customTheme }}
            theme="dark"
            providers={['google', 'apple']}
            redirectTo={`${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback`}
          />
        </CardContent>
      </Card>
    </div>
  )
}
