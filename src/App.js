import React, { useState, useRef, useEffect } from 'react';

import { useInterval } from './hooks/useInterval';
import {
  CANVAS_SIZE,
  SNAKE_START,
  APPLE_START,
  SCALE,
  SPEED,
  DIRECTIONS
} from './constants';

const App = () => {

  const canvasRef = useRef(null);
  const [snake, setSnake] = useState(SNAKE_START);
  const [apple, setApple] = useState(APPLE_START);
  const [gameOver, setGameOver] = useState(false);
  const [direction, setDirection] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);

  const startGame = () => {};

  const endGame = () => {};

  const moveSnake = () => {};

  const createApple = () => {};

  const checkWallCollision = () => {};

  const checkAppleCollision = () => {};

  const gameLoop = () => {};

  useEffect(() => {
    //
  }, [snake, apple, gameOver]);

  return (
    <div role="button" tabIndex={0} onKeyDown={moveSnake}>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {
        gameOver ? (
          <div>GAME OVER!</div>
        ) : null
      }
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default App;
