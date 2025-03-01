import { Line } from "@/types/lines";

interface LineSelectorProps {
  lines: Line[];
  onLineChange: (lineNumber: string) => void;
}

export function LineSelector({ lines, onLineChange }: LineSelectorProps) {
  return (
    <div className="flex flex-col items-center">
      <h4 className="mb-4">Linhas</h4>
      <div className="flex">
        {lines.map((line) => (
          <div key={line.lineNumber} className="relative">
            <input
              type="radio"
              id={`linha${line.lineNumber}`}
              name="linhas"
              value={line.lineNumber}
              checked={line.selected}
              onChange={() => onLineChange(line.lineNumber)}
              className="hidden"
            />
            <label
              htmlFor={`linha${line.lineNumber}`}
              className={`w-16 h-11 flex items-center justify-center cursor-pointer shadow-md
                ${
                  line.lineNumber === "8"
                    ? "bg-[#a19e8f] rounded-l-lg"
                    : "bg-[#02b397] rounded-r-lg"
                }
                ${
                  line.selected
                    ? "border-b-4 border-white font-bold text-white"
                    : "border-b-4 border-transparent"
                }
              `}
            >
              {line.lineNumber}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
