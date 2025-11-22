import React from 'react';
import { useGameStore } from '../store/gameStore';
import { ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

export const CodeToolbar: React.FC = () => {
  const code = useGameStore((state) => state.code);
  const selectedBlockId = useGameStore((state) => state.selectedBlockId);
  const removeInstruction = useGameStore((state) => state.removeInstruction);
  const reorderInstructions = useGameStore((state) => state.reorderInstructions);
  const setSelectedBlockId = useGameStore((state) => state.setSelectedBlockId);

  const handleMove = (direction: 'up' | 'down') => {
    if (!selectedBlockId) return;
    
    const index = code.findIndex(i => i.id === selectedBlockId);
    if (index === -1) return;

    const newCode = [...code];
    if (direction === 'up' && index > 0) {
        [newCode[index], newCode[index - 1]] = [newCode[index - 1], newCode[index]];
        reorderInstructions(newCode);
    } else if (direction === 'down' && index < newCode.length - 1) {
        [newCode[index], newCode[index + 1]] = [newCode[index + 1], newCode[index]];
        reorderInstructions(newCode);
    }
  };

  const handleDelete = () => {
      if (selectedBlockId) {
          removeInstruction(selectedBlockId);
          setSelectedBlockId(null);
      }
  };

  if (!selectedBlockId) return null;

  return (
    <div className="flex items-center gap-1">
        <button 
            onClick={() => handleMove('up')}
            className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 active:scale-95 transition"
            title="Move Up"
        >
            <ArrowUp className="w-4 h-4" />
        </button>
        <button 
            onClick={() => handleMove('down')}
            className="p-1.5 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 active:scale-95 transition"
            title="Move Down"
        >
            <ArrowDown className="w-4 h-4" />
        </button>
        <div className="w-px h-4 bg-gray-300 mx-1" />
        <button 
            onClick={handleDelete}
            className="p-1.5 bg-red-50 border border-red-100 rounded-lg text-red-500 hover:bg-red-100 active:scale-95 transition"
            title="Remove Block"
        >
            <Trash2 className="w-4 h-4" />
        </button>
    </div>
  );
};
