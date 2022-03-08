export const API_BASE_URL = "https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-json/";
export const API_NATIONAL_TREND = "dpc-covid19-ita-andamento-nazionale.json";
export const API_REGIONAL_TREND = "dpc-covid19-ita-regioni-latest.json";

export const NATIONAL_TREND_URL = new URL(API_NATIONAL_TREND, API_BASE_URL).toString();
export const REGIONAL_TREND_URL = new URL(API_REGIONAL_TREND, API_BASE_URL).toString();
