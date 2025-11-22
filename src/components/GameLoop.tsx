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
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlaying && !isPaused) {
      // Initialize Runtime if fresh start
      if (!runtimeRef.current) {
        const level = levels.find(l => l.id === currentLevelId);
        if (!level) return;
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
            
            // Delay result to allow animation to finish
            timeoutRef.current = window.setTimeout(() => {
                if (result.status === 'COMPLETED') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                    useGameStore.setState({ gameStatus: 'WON', isPlaying: false });
                } else {
                    useGameStore.setState({ gameStatus: 'LOST', error: result.message || "Try again!", isPlaying: false });
                }
            }, 800);
        }

      }, executionSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      // Do not clear runtimeRef here if just paused?
      // Current logic: stopGame sets isPlaying=false.
      // If paused, isPaused=true.
      // If strictly stopped, we might want to reset runtime?
      // The store handles 'resetLevel' which resets isPlaying.
      if (!isPlaying) {
          runtimeRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isPlaying, isPaused, currentLevelId, code, executionSpeed]); // dependencies

  return null; // Logic only
};
