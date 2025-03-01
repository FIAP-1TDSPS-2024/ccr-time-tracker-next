interface StationSelectorProps {
  stations: string[];
  onSelectAll: () => void;
  onStationSelect: (stations: string[]) => void;
  selectedStations: string[];
}

export function StationSelector({
  stations,
  onSelectAll,
  onStationSelect,
  selectedStations,
}: StationSelectorProps) {
  const handleStationClick = (clickedStation: string) => {
    const firstSelectedIndex = stations.findIndex((s) =>
      selectedStations.includes(s)
    );
    const clickedIndex = stations.indexOf(clickedStation);

    if (selectedStations.length === 0 || selectedStations.length > 1) {
      onStationSelect([clickedStation]);
    } else {
      // Select all stations between first selected and clicked station
      const start = Math.min(firstSelectedIndex, clickedIndex);
      const end = Math.max(firstSelectedIndex, clickedIndex);
      const stationsToSelect = stations.slice(start, end + 1);
      onStationSelect(stationsToSelect);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <input
          type="checkbox"
          id="selectAllStations"
          onChange={onSelectAll}
          checked={selectedStations.length === stations.length}
          className="mr-2"
        />
        <label htmlFor="selectAllStations">Selecionar todas as estações</label>
      </div>

      <div className="flex overflow-auto w-[95%] h-16 mx-4 rounded-b">
        {stations.map((station, index) => (
          <div key={station}>
            <input
              type="checkbox"
              id={station}
              value={station}
              checked={selectedStations.includes(station)}
              className="hidden"
              onChange={() => handleStationClick(station)}
            />
            <label
              htmlFor={station}
              className={`w-16 h-11 flex items-center justify-center cursor-pointer bg-[#a8a8a8] border border-[#a8a8a8] border-b-4 ${
                selectedStations.includes(station)
                  ? "border-b-white"
                  : "border-[#a8a8a8]"
              } ${
                index === stations.length - 1
                  ? "border-r-[#a8a8a8]"
                  : "border-r-[#000000]"
              }`}
            >
              {station}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
