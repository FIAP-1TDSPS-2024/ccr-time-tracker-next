import Image from "next/image";
import { Alert } from "@/types/lines";

interface AlertsListProps {
  alerts: Alert[];
}

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <section>
      <div className="flex justify-end px-4 md:px-8 mt-4 md:mt-8 mb-4">
        <button
          onClick={() => window.location.reload()}
          className="w-[3.625rem] h-[3.625rem] bg-[#a7a7a7] rounded shadow-md flex items-center justify-center"
        >
          <Image src="/reload.svg" alt="Recarregar" width={24} height={24} />
        </button>
      </div>

      <div>
        {alerts.map((alert, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:justify-between items-center px-4 md:px-16 py-4 mx-4 md:mx-8 mb-4 md:mb-8 bg-[#d9d9d9] rounded shadow-md"
          >
            <div className="flex items-center mb-2 md:mb-0">
              <Image
                src="/alert.svg"
                alt="Alerta"
                width={50}
                height={50}
                className="mr-4"
              />
            </div>
            <span className="text-center my-2">{alert.type}</span>
            <span className="mb-2 md:mb-0">{alert.status}</span>
            <span className="font-bold text-center md:text-left">
              {alert.route}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
