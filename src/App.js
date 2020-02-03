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

  const startGame = () => {
    setSnake(SNAKE_START);
    setApple(APPLE_START);
    setDirection([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };

  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };

  const moveSnake = ({ keyCode}) => {
    if (keyCode >= 37 && keyCode <= 40) {
      setDirection(DIRECTIONS[keyCode]);
    }
  };

  const createApple = () => {
    return apple.map((_, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)))
  };

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[0] < 0 ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[1] < 0
    ) {
      return true;
    }

    for (const segment of snk) {
      if (piece[0] === segment && piece[1] === segment[1]) {
        return true;
      }
    }

    return false;
  };

  const checkAppleCollision = (newSnake) => {
    if (newSnake[0][0] === apple[0] && newSnake[0][1] === apple[1]) {
      let newApple = createApple();
      while(checkCollision(newApple, newSnake)) {
        newApple = createApple();
      }
      setApple(newApple);
      return true;
    }
    return false;
  };

  const gameLoop = () => {
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + direction[0], snakeCopy[0][1] + direction[1]];
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) {
      endGame();
    }
    if (!checkAppleCollision(snakeCopy)) {
      snakeCopy.pop();
    }
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

  useInterval(() => {
    gameLoop();
  }, speed);

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
