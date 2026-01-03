import { ThemeProvider } from '@/lib/theme-provider'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import appCss from '../styles.css?url'
import { SmoothScroll } from '@/components/SmoothScroll'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Agiri Taofeek | Frontend Engineer',
      },
      {
        name: 'description',
        content:
          'Portfolio of Agiri Taofeek, a Frontend Engineer specializing in scalable financial web applications and 3D web experiences.',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),

  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      {/* relative to the body was due to the safari issues in ios 26 as advise in base ui docs */}
      <body className="relative bg-background text-foreground font-body">
        <SmoothScroll />
        <ThemeProvider>
          {/* isolate on the body wrapper as advised by base ui */}
          <div className="isolate">{children}</div>
          <TanStackDevtools
            config={{
              position: 'bottom-right',
            }}
            plugins={[
              {
                name: 'Tanstack Router',
                render: <TanStackRouterDevtoolsPanel />,
              },
            ]}
          />
        </ThemeProvider>
        <Scripts />
        <div className="grain" />
      </body>
    </html>
  )
}
