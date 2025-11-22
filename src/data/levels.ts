import type { Level, TileType } from '../types/game';

const E: TileType = 'EMPTY';
const W: TileType = 'WALL';
const S: TileType = 'START';
const F: TileType = 'END'; // Flag/Finish
const ST: TileType = 'STAR';

export const levels: Level[] = [
  {
    id: 1,
    name: "Hello Codey!",
    tutorialText: "Drag the 'Move Forward' block to the workspace and press Play!",
    availableBlocks: ['MOVE_FORWARD'],
    minStars: 0,
    start: { x: 1, y: 1, dir: 'RIGHT' },
    grid: [
      [W, W, W, W, W],
      [W, S, E, F, W],
      [W, W, W, W, W],
    ]
  },
  {
    id: 2,
    name: "Turn It Up",
    tutorialText: "Codey needs to turn to reach the goal.",
    availableBlocks: ['MOVE_FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
    minStars: 0,
    start: { x: 1, y: 1, dir: 'RIGHT' },
    grid: [
      [W, W, W, W, W, W],
      [W, S, E, W, W, W],
      [W, W, E, F, W, W],
      [W, W, W, W, W, W],
    ]
  },
  {
    id: 3,
    name: "Star Catcher",
    tutorialText: "Collect the star before reaching the flag!",
    availableBlocks: ['MOVE_FORWARD', 'TURN_LEFT', 'TURN_RIGHT'],
    minStars: 1,
    start: { x: 1, y: 1, dir: 'RIGHT' },
    grid: [
      [W, W, W, W, W],
      [W, S, ST, F, W],
      [W, W, W, W, W],
    ]
  },
  {
    id: 4,
    name: "Loop de Loop",
    tutorialText: "Use a Loop block to repeat actions efficiently.",
    availableBlocks: ['MOVE_FORWARD', 'LOOP'],
    minStars: 0,
    start: { x: 1, y: 1, dir: 'RIGHT' },
    grid: [
      [W, W, W, W, W, W, W],
      [W, S, E, E, E, F, W],
      [W, W, W, W, W, W, W],
    ]
  },
   {
    id: 5,
    name: "Jump Around",
    tutorialText: "Use Jump to hop over walls or holes!",
    availableBlocks: ['MOVE_FORWARD', 'JUMP', 'TURN_RIGHT'],
    minStars: 0,
    start: { x: 1, y: 1, dir: 'RIGHT' },
    grid: [
      [W, W, W, W, W, W],
      [W, S, W, E, F, W],
      [W, W, W, W, W, W],
    ]
  },
];
