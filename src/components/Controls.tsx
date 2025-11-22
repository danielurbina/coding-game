import React from 'react';
import { Play, RotateCcw, Trash2, Square } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Controls: React.FC = () => {
  const isPlaying = useGameStore(s => s.isPlaying);
  const runGame = useGameStore(s => s.runGame);
  const stopGame = useGameStore(s => s.stopGame);
  const resetLevel = useGameStore(s => s.resetLevel);
  const setCode = useGameStore(s => s.reorderInstructions); // Hack to clear code: setCode([])

  return (
    <div className="flex items-center gap-3 p-2">
      {!isPlaying ? (
        <button 
            onClick={runGame}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:translate-y-1 transition-all"
        >
            <Play className="fill-white" /> Run Code
        </button>
      ) : (
        <button 
            onClick={stopGame}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:translate-y-1 transition-all"
        >
            <Square className="fill-white" /> Stop
        </button>
      )}
      
      <button 
        onClick={resetLevel}
        className="p-3 bg-yellow-400 text-white rounded-xl shadow-sm active:scale-95"
        title="Reset Level"
      >
        <RotateCcw />
      </button>

       <button 
        onClick={() => setCode([])}
        className="p-3 bg-gray-200 text-gray-600 rounded-xl shadow-sm active:scale-95"
        title="Clear Code"
      >
        <Trash2 />
      </button>
    </div>
  );
};
