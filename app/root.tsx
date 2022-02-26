import styles from "./styles/app.css";
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from "remix";
import type { LinksFunction, MetaFunction } from "remix";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return {
    title: "Covidin.it | Statistiche Covid in tempo reale",
    description: "Informazioni e statistiche aggiornate sullo stato del COVID-19 in Italia.",
    keywords: "covid,informazioni,statistiche,italia,covid19,covid-19,pandemia,virus",
  };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
