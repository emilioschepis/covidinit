import dayjs from "dayjs";
import { json, LoaderFunction, useLoaderData } from "remix";
import Card from "~/components/Card";
import { NATIONAL_TREND_URL, REGIONAL_TREND_URL } from "~/constants";
import { convertNationalData } from "~/lib/converters";
import { NationalData, NationalDataResponse, RegionalDataResponse } from "~/models";

type LoaderData = { national: NationalData };

export const loader: LoaderFunction = async (): Promise<Response> => {
  const [national, regional] = await Promise.all([
    fetch(NATIONAL_TREND_URL).then((data) => data.json<NationalDataResponse[]>()),
    fetch(REGIONAL_TREND_URL).then((data) => data.json<RegionalDataResponse[]>()),
  ]);

  return json(
    {
      national: convertNationalData(national),
    },
    {
      headers: {
        "Cache-Control": "max-age=3600, must-revalidate",
      },
    }
  );
};

export default function Index() {
  const { national } = useLoaderData<LoaderData>();

  return (
    <div className="pt-4 space-y-4">
      <header className="px-4">
        <h1 className="text-3xl font-bold">Dati COVID-19 in Italia</h1>
        <p className="text-gray-600 font-bold">
          Dati aggiornati al <time dateTime={national.date}>{dayjs(national.date).format("DD/MM/YYYY HH:mm")}</time>
        </p>
      </header>

      <main className="px-4 md:mb-20">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 mb-4">
          <Card icon="🦠" label="Totali" trend={national.cases} />
          <Card icon="🟢" label="Guariti" trend={national.recovered} />
          <Card icon="🔴" label="Positivi" trend={national.positives} variationCanImprove />
          <Card icon="⚫️" label="Deceduti" trend={national.dead} />
          <Card icon="🏥" label="Ospedalizzati" trend={national.hospitalized} variationCanImprove />
          <Card icon="🚨" label="Terapie intensive" trend={national.intensiveCare} variationCanImprove />
          <Card icon="🧫" label="Tamponi" trend={national.tests} />
          <Card
            icon="📉"
            label="Tasso di positività"
            type="percent"
            trend={national.positiveTestsRate}
            variationCanImprove
          />
        </div>
      </main>
      <footer className="relative flex flex-col justify-center items-center bottom-0 left-0 w-full p-4 border-t-[1px] border-gray-300 text-sm text-gray-700 bg-white md:fixed">
        <div className="space-x-2">
          <a className="text-blue-600" href="https://github.com/emilioschepis/covidinit">
            Source
          </a>
          <span aria-hidden>•</span>
          <a className="text-blue-600" href="https://twitter.com/emilioschepis">
            Twitter
          </a>
          <span aria-hidden>•</span>
          <a className="text-blue-600" href="https://github.com/pcm-dpc/COVID-19">
            Data
          </a>
        </div>
      </footer>
    </div>
  );
}
