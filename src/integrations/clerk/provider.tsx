import { localization } from '@/lib/constants'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from "@clerk/themes";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

export default function AppClerkProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={localization}
	
			publishableKey={PUBLISHABLE_KEY}
			afterSignOutUrl="/"
			appearance={{
				baseTheme: dark,
				elements: {
					headerTitle: {
						fontFamily: "var(--font-heading)",
						fontSize: "1.5em",
						fontWeight: "bold",
						color: "var(--color-primary)",
						textAlign: "center",
					},
					headerSubtitle: {
						fontFamily: "var(--font-sans)",
						color: "var(--color-muted-foreground)",
						textAlign: "center",
					},
					button: {
						backgroundColor: "var(--color-secondary)",
						borderRadius: 0,
					},
					input: {
						border: "var(--color-foreground)",
					},
					formButtonPrimary: {
						backgroundColor: "var(--color-primary)",
						color: "var(--color-primary-foreground)",
						borderRadius: 0,
					},

					actionCard: {
						padding: 0,
						margin: 0,
					},
					card: {
						fontFamily: "var(--font-sans)",
						paddingLeft: 16,
						paddingRight: 16,
					},
				},
				variables: {
					colorBackground: "var(--color-background)",
					colorPrimary: "var(--color-primary)",
					colorInput: "var(--color-input)",
					colorText: "var(--color-text)",
					colorTextSecondary: "var(--color-text-secondary)",
					colorModalBackdrop: "var(--color-background)",
					colorBorder: "var(--color-border)",
					colorMuted: "var(--color-secondary)",
					colorDanger: "var(--color-destructive)",
					colorForeground: "var(--color-foreground)",
					colorSuccess: "var(--color-success)",
					colorPrimaryForeground: "var(--color-primary-foreground)",
					colorMutedForeground: "var(--color-muted-foreground)",
					fontFamily: "var(--font-sans)",
					fontFamilyButtons: "var(--font-sans)",
				},
			}}>
      {children}
    </ClerkProvider>
  )
}
