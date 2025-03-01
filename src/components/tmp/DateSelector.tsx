interface DateSelectorProps {
  selectedDate: string;
  onDateChange: (date: string) => void;
}

export function DateSelector({ selectedDate, onDateChange }: DateSelectorProps) {
  return (
    <div className="flex flex-col items-center">
      <h4 className="mb-4">Data</h4>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        max={new Date().toISOString().split('T')[0]}
        className="bg-[#a8a8a8] rounded p-2 shadow-md"
      />
    </div>
  );
} 