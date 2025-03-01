"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header/Header";
import { Footer } from "@/components/Footer";
import { LineSelector } from "@/components/tmp/LineSelector";
import { DateSelector } from "@/components/tmp/DateSelector";
import { StationSelector } from "@/components/tmp/StationSelector";
import { MetricsGrid } from "@/components/tmp/MetricsGrid";
import { AlertsList } from "@/components/tmp/AlertsList";
import { Line, Metric, Alert } from "@/types/lines";

const defaultLines = [
  {
    lineNumber: "8",
    selected: true,
    stations: [
      "AMB",
      "AMT",
      "SAR",
      "ITA",
      "ECA",
      "SCO",
      "JAN",
      "JBE",
      "BAR",
      "AJO",
      "STA",
      "CAR",
      "GMC",
      "QUI",
      "CSA",
      "OSA",
      "PRA",
      "ILE",
      "DDM",
      "LAP",
      "AGB",
      "PBF",
      "JPR",
    ],
  },
  {
    lineNumber: "9",
    selected: false,
    stations: [
      "OSA",
      "PRA",
      "CEA",
      "VLJ",
      "CIU",
      "PIN",
      "HER",
      "CIJ",
      "VOL",
      "BER",
      "MOR",
      "GRJ",
      "JDI",
      "SMA",
      "SCR",
      "JUR",
      "AUT",
      "PRN",
      "GRA",
      "MVN",
    ],
  },
];

export default function TMP() {
  const [lines, setLines] = useState<Line[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [selectedStations, setSelectedStations] = useState<string[]>([]);
  const [alerts] = useState<Alert[]>([
    {
      type: "Viagem muito longa",
      status: "Início: 4:30 - Em linha",
      route: "OSA <> PRA",
    },
    {
      type: "Viagem muito longa",
      status: "Início: 2:30 - Fim: 2:50",
      route: "CEA <> VLJ",
    },
  ]);

  useEffect(() => {
    const today = new Date();
    setSelectedDate(today.toISOString().split("T")[0]);

    const storedLines = localStorage.getItem("all-lines");
    if (!storedLines) {
      localStorage.setItem("all-lines", JSON.stringify(defaultLines));
      setLines(defaultLines);
    } else {
      setLines(JSON.parse(storedLines));
    }
  }, []);

  const handleLineChange = (lineNumber: string) => {
    const updatedLines = lines.map((line) => ({
      ...line,
      selected: line.lineNumber === lineNumber,
    }));
    setLines(updatedLines);
    localStorage.setItem("all-lines", JSON.stringify(updatedLines));
  };

  const selectedLine = lines.find((line) => line.selected);

  const calculateMetrics = (stations: string[]) => {
    const metrics: Metric[] = [
      {
        name: "Tempo médio de percurso",
        value: `${String(
          (((stations.length - 1) * 2.5) / stations.length).toFixed(2)
        ).replace(".", ":")} Min`,
      },
      {
        name: "Tempo total de percurso",
        value: `${Math.round((stations.length - 1) * 3)} Min`,
      },
      {
        name: "Diferença último mês",
        value: `-${Math.floor(Math.random() * 5)} Seg`,
        negative: true,
      },
      {
        name: "Diferença último ano",
        value: `+${Math.floor(Math.random() * 10)} Seg`,
        positive: true,
      },
    ];
    setMetrics(metrics);
  };

  const handleSelectAllStations = () => {
    if (!selectedLine) return;
    setSelectedStations(selectedLine.stations);
    calculateMetrics(selectedLine.stations);
  };

  const handleStationSelect = (stations: string[]) => {
    setSelectedStations(stations);
    calculateMetrics(stations);
  };

  useEffect(() => {
    if (selectedLine) {
      setSelectedStations(selectedLine.stations);
      calculateMetrics(selectedLine.stations);
    }
  }, [selectedLine]);

  return (
    <div className="min-h-screen flex flex-col bg-[#d0d0d0]">
      <Header pageName="Tempo médio de percurso" showBackButton />

      <main className="flex-1">
        <section className="p-4">
          <div className="flex flex-col md:flex-row justify-between md:mx-20 mb-8 md:mb-16 gap-8">
            <LineSelector lines={lines} onLineChange={handleLineChange} />
            <DateSelector
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </div>

          {selectedLine && (
            <StationSelector
              stations={selectedLine.stations}
              onSelectAll={handleSelectAllStations}
              onStationSelect={handleStationSelect}
              selectedStations={selectedStations}
            />
          )}
        </section>

        <hr className="w-[95%] md:w-[97%] mx-auto my-4 md:my-8" />

        <MetricsGrid metrics={metrics} />

        <hr className="w-[95%] md:w-[97%] mx-auto my-4 md:my-8" />

        <AlertsList alerts={alerts} />
      </main>

      <Footer />
    </div>
  );
}
