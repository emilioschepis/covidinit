import { NationalData, NationalDataResponse, RegionalData, RegionalDataResponse } from "~/models";

export function convertNationalData(data: NationalDataResponse[]): NationalData {
  const today = data[data.length - 1];
  const yesterday = data[data.length - 2];
  const twoDaysAgo = data[data.length - 3];

  return {
    date: today.data,
    cases: {
      today: today.totale_casi,
      yesterday: yesterday.totale_casi,
      variation: today.nuovi_positivi,
    },
    dead: {
      today: today.deceduti,
      yesterday: yesterday.deceduti,
      variation: today.deceduti - yesterday.deceduti,
    },
    recovered: {
      today: today.dimessi_guariti,
      yesterday: yesterday.dimessi_guariti,
      variation: today.dimessi_guariti - yesterday.dimessi_guariti,
    },
    positives: {
      today: today.totale_positivi,
      yesterday: yesterday.totale_positivi,
      variation: today.variazione_totale_positivi,
    },
    hospitalized: {
      today: today.totale_ospedalizzati,
      yesterday: yesterday.totale_ospedalizzati,
      variation: today.totale_ospedalizzati - yesterday.totale_ospedalizzati,
    },
    intensiveCare: {
      today: today.terapia_intensiva,
      yesterday: yesterday.terapia_intensiva,
      variation: today.terapia_intensiva - yesterday.terapia_intensiva,
    },
    tests: {
      today: today.tamponi,
      yesterday: yesterday.tamponi,
      variation: today.tamponi - yesterday.tamponi,
    },
    positiveTestsRate: {
      today: today.nuovi_positivi / (today.tamponi - yesterday.tamponi),
      yesterday: yesterday.nuovi_positivi / (yesterday.tamponi - twoDaysAgo.tamponi),
      variation:
        today.nuovi_positivi / (today.tamponi - yesterday.tamponi) -
        yesterday.nuovi_positivi / (yesterday.tamponi - twoDaysAgo.tamponi),
    },
  };
}

export function convertRegionalData(data: RegionalDataResponse[]): RegionalData {
  return data.map((region) => ({
    id: region.codice_regione.toString(),
    date: region.data,
    name: region.denominazione_regione,
    positives: {
      today: region.totale_positivi,
      yesterday: region.totale_positivi - region.variazione_totale_positivi,
      variation: region.variazione_totale_positivi,
    },
  }));
}
