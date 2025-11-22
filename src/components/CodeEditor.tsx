import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Block } from './Block';
import type { Instruction } from '../types/game';

interface CodeEditorProps {
  className?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ className }) => {
  const code = useGameStore((state) => state.code);
  
  return (
    <div className={`flex flex-col p-4 overflow-y-auto ${className}`}>
       {code.length === 0 && (
         <div className="text-center text-gray-400 mt-10 font-medium">
           Start by adding blocks from the menu below!
         </div>
       )}
       <BlockList instructions={code} />
    </div>
  );
};

const BlockList = ({ instructions }: { instructions: Instruction[] }) => {
    return (
        <>
            {instructions.map(inst => <Block key={inst.id} instruction={inst} />)}
        </>
    )
}

