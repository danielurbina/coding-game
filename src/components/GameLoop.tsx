import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';
import { levels } from '../data/levels';
import { GameRuntime } from '../utils/runtime';
import confetti from 'canvas-confetti';

export const GameLoop = () => {
  const isPlaying = useGameStore(s => s.isPlaying);
  const isPaused = useGameStore(s => s.isPaused);
  const currentLevelId = useGameStore(s => s.currentLevelId);
  const code = useGameStore(s => s.code);
  const executionSpeed = useGameStore(s => s.executionSpeed);
  
  const runtimeRef = useRef<GameRuntime | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      // Initialize Runtime if fresh start
      if (!runtimeRef.current) {
        const level = levels.find(l => l.id === currentLevelId);
        if (!level) return;
        // We use the INITIAL start state from level, NOT the current player state (which might be moved already? No, runGame resets it).
        // Actually, runGame resets playerState to level.start.
        runtimeRef.current = new GameRuntime(code, level, level.start);
      }

      timerRef.current = window.setInterval(() => {
        if (!runtimeRef.current) return;

        const result = runtimeRef.current.step();
        
        // Update UI
        useGameStore.setState({
            playerState: result.playerState,
            activeInstructionId: result.activeInstructionId,
            collectedStars: result.collectedStars
        });

        if (result.status !== 'RUNNING') {
            if (timerRef.current) clearInterval(timerRef.current);
            runtimeRef.current = null;
            
            if (result.status === 'COMPLETED') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                useGameStore.setState({ gameStatus: 'WON', isPlaying: false });
                // Unlock next level? Handled in Overlay
            } else {
                useGameStore.setState({ gameStatus: 'LOST', error: result.message || "Try again!", isPlaying: false });
            }
        }

      }, executionSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (!isPlaying) {
          runtimeRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isPaused, currentLevelId, code, executionSpeed]); // dependencies

  return null; // Logic only
};
