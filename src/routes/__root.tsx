import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";

import appCss from "../styles.css?url";
import { Logo } from "@/components/Logo";
import { AppStateProvider } from "@/lib/app-state";
import { ThemeProvider, themeBootScript } from "@/lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="surface-strong hairline max-w-md rounded-[32px] p-8 text-center">
        <Logo size={72} />
        <h1 className="text-gradient-brand font-display text-7xl leading-none">404</h1>
        <h2 className="mt-4 font-display text-xl text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">الصفحة التي تبحث عنها غير متوفرة.</p>
        <div className="mt-6">
          <Link
            to="/"
            className="bg-gradient-brand shadow-brand inline-flex items-center justify-center rounded-2xl px-5 py-2.5 font-display text-sm text-primary-foreground"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="surface-strong hairline max-w-md rounded-[32px] p-8 text-center">
        <h1 className="font-display text-xl text-foreground">حدث خطأ ما</h1>
        <p className="mt-2 text-sm text-muted-foreground">يمكنك المحاولة مرة أخرى.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-gradient-brand shadow-brand rounded-2xl px-5 py-2.5 font-display text-sm text-primary-foreground"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#F7EFE2", media: "(prefers-color-scheme: light)" },
      { name: "theme-color", content: "#221C17", media: "(prefers-color-scheme: dark)" },
      { title: "ورقة وقلم" },
      { name: "description", content: "منصتك التعليمية الأولى في سوريا" },
      { property: "og:title", content: "ورقة وقلم" },
      { property: "og:description", content: "منصتك التعليمية الأولى في سوريا" },
      { name: "twitter:title", content: "ورقة وقلم" },
      { name: "twitter:description", content: "منصتك التعليمية الأولى في سوريا" },
      {
        property: "og:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f94a2258-4a01-4db6-a1cc-0927574570ce",
      },
      {
        name: "twitter:image",
        content:
          "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/f94a2258-4a01-4db6-a1cc-0927574570ce",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@300;400;500;600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppStateProvider>
          <AnimatePresence mode="wait">
            <Outlet />
          </AnimatePresence>
        </AppStateProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
