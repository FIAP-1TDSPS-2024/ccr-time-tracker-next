interface AddItemPopupProps {
  newItem: { name: string; slug: string; url: string };
  setNewItem: (item: { name: string; slug: string; url: string }) => void;
  onAdd: () => void;
  onClose: () => void;
}

export function AddItemPopup({
  newItem,
  setNewItem,
  onAdd,
  onClose,
}: AddItemPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#d9d9d9] p-12 rounded flex flex-col items-center w-[30rem]">
        <h2 className="text-2xl font-bold mb-8">Adicionar novo item</h2>
        <div className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Nome"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-[19.938rem] h-[2.813rem] rounded px-4"
          />
          <input
            type="text"
            placeholder="Abreviação"
            value={newItem.slug}
            onChange={(e) => setNewItem({ ...newItem, slug: e.target.value })}
            className="w-[19.938rem] h-[2.813rem] rounded px-4"
          />
          <input
            type="text"
            placeholder="URL de acesso"
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            className="w-[19.938rem] h-[2.813rem] rounded px-4"
          />
        </div>
        <div className="flex gap-4">
          <button
            onClick={onAdd}
            className="w-40 h-7 rounded bg-[#476087] text-white"
          >
            Adicionar
          </button>
          <button onClick={onClose} className="w-40 h-7 rounded bg-[#b3b3b3]">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
