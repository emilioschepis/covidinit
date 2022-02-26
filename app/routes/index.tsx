import dayjs from "dayjs";
import { json, LoaderFunction, useLoaderData } from "remix";
import Card from "~/components/Card";
import { NATIONAL_TREND_URL } from "~/constants";
import { NationalTrend, NationalTrendResponse } from "~/models";

export const loader: LoaderFunction = async (): Promise<Response> => {
  const response = await fetch(NATIONAL_TREND_URL);
  const jsonResponse = await response.json<NationalTrendResponse>();

  const today = jsonResponse[jsonResponse.length - 1];
  const yesterday = jsonResponse[jsonResponse.length - 2];
  const twoDaysAgo = jsonResponse[jsonResponse.length - 3];

  const data: NationalTrend = {
    date: today.data,
    cases_count: today.totale_casi,
    cases_variation: today.nuovi_positivi,
    positives_count: today.totale_positivi,
    positives_variation: today.variazione_totale_positivi,
    deaths_count: today.deceduti,
    deaths_variation: today.deceduti - yesterday.deceduti,
    tests_count: today.tamponi,
    tests_variation: today.tamponi - yesterday.tamponi,
    positive_rate: today.nuovi_positivi / (today.tamponi - yesterday.tamponi),
    positive_rate_variation:
      today.nuovi_positivi / (today.tamponi - yesterday.tamponi) -
      yesterday.nuovi_positivi / (yesterday.tamponi - twoDaysAgo.tamponi),
    intensive_care_count: today.terapia_intensiva,
    intensive_care_variation: today.terapia_intensiva - yesterday.terapia_intensiva,
  };

  return json(data, {
    headers: {
      "Cache-Control": "max-age=3600, must-revalidate",
    },
  });
};

export default function Index() {
  const data = useLoaderData<NationalTrend>();

  return (
    <div className="pt-4 space-y-4">
      <header className="px-4">
        <h1 className="text-3xl font-bold">Dati COVID-19 in Italia</h1>
        <p className="text-gray-600 font-bold">
          Dati aggiornati al <time dateTime={data.date}>{dayjs(data.date).format("DD/MM/YYYY HH:mm")}</time>
        </p>
      </header>

      <main className="px-4 grid grid-cols-2 gap-2 md:grid-cols-3 md:mb-20">
        <Card icon="🦠" label="Casi totali" value={data.cases_count} variation={data.cases_variation} />
        <Card
          icon="😷"
          label="Positivi"
          value={data.positives_count}
          variation={data.positives_variation}
          variationCanImprove
        />
        <Card icon="⚫️" label="Deceduti" value={data.deaths_count} variation={data.deaths_variation} />
        <Card
          icon="🏥"
          label="Terapie intensive"
          value={data.intensive_care_count}
          variation={data.intensive_care_variation}
          variationCanImprove
        />
        <Card
          icon="🔬"
          label="Tasso di positività"
          type="percent"
          value={data.positive_rate}
          variation={data.positive_rate_variation}
          variationCanImprove
        />
        <Card icon="🧫" label="Tamponi" value={data.tests_count} variation={data.tests_variation} />
      </main>
      <footer className="relative flex flex-col justify-center items-center bottom-0 left-0 w-full p-4 border-t-[1px] border-gray-300 text-sm text-gray-700 bg-white md:fixed">
        <div>
          Made with <span aria-label="love">❤️</span> by Emilio Schepis
        </div>
        <div className="space-x-2">
          <a className="text-blue-600" href="https://github.com/emilioschepis/covidinit">
            Source
          </a>
          <span aria-hidden>•</span>
          <a className="text-blue-600" href="https://twitter.com/emilioschepis">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
}
