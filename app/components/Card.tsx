import { useMemo } from "react";
import { Trend } from "~/models";

type Props = {
  icon: string;
  label: string;
  trend: Trend;
  type?: "absolute" | "percent";

  /**
   * Whether or not the variation can be < 0 indicating an improvement.
   */
  variationCanImprove?: boolean;
};

export default function Card({ icon, trend, label, type = "absolute", variationCanImprove = false }: Props) {
  const variationFormatter = useMemo(
    () =>
      Intl.NumberFormat("it-IT", {
        signDisplay: "always",
        style: type === "percent" ? "percent" : "decimal",
        minimumFractionDigits: type === "percent" ? 1 : 0,
        maximumFractionDigits: type === "percent" ? 1 : 0,
      }),
    [type]
  );

  const valueFormatter = useMemo(
    () =>
      Intl.NumberFormat("it-IT", {
        signDisplay: "never",
        style: type === "percent" ? "percent" : "decimal",
        minimumFractionDigits: type === "percent" ? 1 : 0,
        maximumFractionDigits: type === "percent" ? 1 : 0,
      }),
    [type]
  );

  const variationTextColor = useMemo(() => {
    if (!variationCanImprove) {
      return "text-gray-800";
    }

    if (trend.variation <= 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  }, [trend.variation, variationCanImprove]);

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-stretch shadow-md space-y-4">
      <p aria-label={label} className="text-xl text-center font-bold">
        {icon} {label}
      </p>
      <p className={`text-3xl font-black ${variationTextColor} text-center`}>
        {variationFormatter.format(trend.variation)}
      </p>
      <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-4">
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-500">{valueFormatter.format(trend.yesterday)}</p>
          <p className="text-md font-semibold text-gray-500">Ieri</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-800">{valueFormatter.format(trend.today)}</p>
          <p className="text-md font-semibold text-gray-800">Oggi</p>
        </div>
      </div>
    </div>
  );
}
