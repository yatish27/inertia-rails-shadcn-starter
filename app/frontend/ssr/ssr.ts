import { createInertiaApp } from "@inertiajs/react"
import createServer from "@inertiajs/react/server"
import { type ReactNode, createElement } from "react"
import ReactDOMServer from "react-dom/server"

import PersistentLayout from "@/layouts/persistent-layout"

// Temporary type definition, until @inertiajs/react provides one
interface ResolvedComponent {
  default: ReactNode & { layout?: (page: ReactNode) => ReactNode }
}

const appName = (import.meta.env.VITE_APP_NAME ?? "Rails") as string

createServer((page) =>
  createInertiaApp({
    page,
    render: ReactDOMServer.renderToString,
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
      const pages = import.meta.glob<ResolvedComponent>("../pages/**/*.tsx", {
        eager: true,
      })
      const page = pages[`../pages/${name}.tsx`]
      if (!page) {
        console.error(`Missing Inertia page component: '${name}.tsx'`)
      }

      // To use a default layout, import the Layout component
      // and use the following line.
      // see https://inertia-rails.dev/guide/pages#default-layouts
      //
      page.default.layout ??= (page) =>
        createElement(PersistentLayout, null, page)

      return page
    },
    setup: ({ App, props }) => createElement(App, props),
  }),
)
