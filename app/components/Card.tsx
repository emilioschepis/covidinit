import { useMemo } from "react";

type Props = {
  icon: string;
  variation: number;
  value: number;
  label: string;
  type?: "absolute" | "percent";

  /**
   * Whether or not the variation can be < 0 indicating an improvement.
   */
  variationCanImprove?: boolean;
};

export default function Card({ icon, variation, value, label, type = "absolute", variationCanImprove = false }: Props) {
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
      return "text-black";
    }

    if (variation <= 0) {
      return "text-green-600";
    } else {
      return "text-red-600";
    }
  }, [variation, variationCanImprove]);

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col items-center shadow-md">
      <p aria-hidden className="text-4xl mb-4">
        {icon}
      </p>
      <p className={`text-sm font-bold ${variationTextColor}`}>{variationFormatter.format(variation)}</p>
      <p className="text-2xl font-black">{valueFormatter.format(value)}</p>
      <p className="text-gray-600 text-center">{label}</p>
    </div>
  );
}
