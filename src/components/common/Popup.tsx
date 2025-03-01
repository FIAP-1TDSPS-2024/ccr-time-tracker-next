interface PopupProps {
  message: string;
  title: string;
  onClose: () => void;
}

export function Popup({ message, title, onClose }: PopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#d9d9d9] p-8 rounded-lg w-[34rem] flex flex-col items-center">
        <h3 className="text-center mb-1 font-bold">{title}</h3>
        <p className="text-center w-[22rem] mb-4">{message}</p>
        <button
          className="bg-[#476087] text-white px-8 py-2 rounded-lg"
          onClick={onClose}
        >
          Entendido
        </button>
      </div>
    </div>
  );
}
