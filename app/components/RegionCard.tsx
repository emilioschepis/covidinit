import { useMemo } from "react";
import { RegionalData, Trend } from "~/models";

type Props = {
  region: RegionalData[number];
};

export default function RegionCard({ region }: Props) {
  const variationFormatter = useMemo(
    () =>
      Intl.NumberFormat("it-IT", {
        signDisplay: "always",
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    []
  );

  const valueFormatter = useMemo(
    () =>
      Intl.NumberFormat("it-IT", {
        signDisplay: "never",
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    []
  );

  const variationTextColor = useMemo(() => {
    if (region.positives.variation <= 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  }, [region.positives.variation]);

  return (
    <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow ">
      <p className="text-xl text-center font-bold">{region.name}</p>
      <div className="flex items-center space-x-4">
        <p className={`text-xl font-semibold ${variationTextColor} text-center`}>
          {variationFormatter.format(region.positives.variation)}
        </p>
        <p className={`text-xl font-semibold text-gray-800 text-center`}>
          {valueFormatter.format(region.positives.today)}
        </p>
      </div>
    </div>
  );
}
