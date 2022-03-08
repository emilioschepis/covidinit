type DataResponse = {
  casi_testati: number;
  deceduti: number;
  dimessi_guariti: number;
  isolamento_domiciliare: number;
  nuovi_positivi: number;
  ricoverati_con_sintomi: number;
  tamponi: number;
  terapia_intensiva: number;
  totale_casi: number;
  totale_ospedalizzati: number;
  totale_positivi: number;
  variazione_totale_positivi: number;
};

export type NationalDataResponse = DataResponse & {
  data: string;
};

export type RegionalDataResponse = DataResponse & {
  data: string;
  denominazione_regione: string;
  codice_regione: number;
};

export type Trend = { today: number; yesterday: number; variation: number };

export type NationalData = {
  date: string;
  cases: Trend;
  positives: Trend;
  hospitalized: Trend;
  intensiveCare: Trend;
  recovered: Trend;
  dead: Trend;
  tests: Trend;
  positiveTestsRate: Trend;
};
