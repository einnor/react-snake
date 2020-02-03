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

  const moveSnake = ({ keyCode}) => {
    if (keyCode >= 37 && keyCode <= 40) {
      setDirection(keyCode);
    }
  };

  const createApple = () => {};

  const checkWallCollision = () => {};

  const checkAppleCollision = () => {};

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + direction[0], snakeCopy[0][1] + direction[1]];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();
    setSnake(snakeCopy);
  };

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0,0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = 'pink';
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'lightblue';
    context.fillRect(apple[0], apple[1], 1, 1);
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
