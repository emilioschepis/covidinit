export type NationalTrendResponse = {
  data: string;
  ricoverati_con_sintomi: number;
  terapia_intensiva: number;
  totale_ospedalizzati: number;
  isolamento_domiciliare: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
  nuovi_positivi: number;
  dimessi_guariti: number;
  deceduti: number;
  totale_casi: number;
  ingressi_terapia_intensiva: number;
  tamponi: number;
}[];

export type NationalTrend = {
  date: string;
  positives_count: number;
  positives_variation: number;
  cases_count: number;
  cases_variation: number;
  deaths_count: number;
  deaths_variation: number;
  tests_count: number;
  tests_variation: number;
  positive_rate: number;
  positive_rate_variation: number;
  intensive_care_count: number;
  intensive_care_variation: number;
};
