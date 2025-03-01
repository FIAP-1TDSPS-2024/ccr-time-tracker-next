import { Metric } from "@/types/lines";

interface MetricsGridProps {
  metrics: Metric[];
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 md:p-0 max-w-[36rem] mx-auto">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className={`border border-[#a8a8a8] rounded-lg w-full md:w-[17.188rem] h-[10.188rem] flex flex-col items-center
            ${metric.negative ? "metricNegative" : ""}
            ${metric.positive ? "metricPositive" : ""}`}
        >
          <h3 className="bg-[#7b7b7b] w-full h-11 rounded-t-lg text-center flex items-center justify-center text-base font-bold">
            {metric.name}
          </h3>
          <h1
            className={`bg-[#ececec] w-full h-[7.438rem] rounded-b-lg text-4xl flex items-center justify-center
            ${metric.negative ? "text-[#c70000]" : ""}
            ${metric.positive ? "text-[#03ac00]" : ""}`}
          >
            {metric.value}
          </h1>
        </div>
      ))}
    </section>
  );
}
