/* globals GroupEffect SequenceEffect */

import { getBoxSize } from "./util";
import config from "./config";

const boxSize = getBoxSize();

export const animateLetter = (letter, mirror = false) => {
  const shapes = [...letter.querySelectorAll(`.Shape`)];
  const letterRect = letter.getBoundingClientRect();
  if (!mirror) {
    shapes.reverse();
  }

  // XXX make dynamic
  const { offsetAbs } = config;
  const offsetTop = mirror ? offsetAbs : -offsetAbs;

  const shapeSteps = shapes.map((shape, i) => {
    const shapeRect = shape.getBoundingClientRect();
    const { speedFactor } = config;
    const yOff = +shape.dataset.y;
    const shapeX = +shape.dataset.x;
    const shapeY = +shape.dataset.y;
    const shapeHeight = +shape.dataset.height;
    const shapeWidth = +shape.dataset.width;
    const letterHeight = letterRect.height / boxSize;
    const yFall =
      letterHeight - (mirror ? yOff : letterHeight - yOff - shapeHeight);
    const offsetFall = offsetAbs / boxSize;
    const fallDistance = (offsetFall + yFall) * boxSize;
    const offsetLeft = letterRect.width / 2;
    const leftMid = (shapeWidth * boxSize) / 2 + shapeX * boxSize;
    const slideDistance = Math.abs(offsetLeft - leftMid);
    const Effect = (...args) => new KeyframeEffect(shape, ...args);
    const initLeftOffset = letterRect.width / 2 - shapeRect.width / 2;
    const fadeInEffect = Effect(
      {
        opacity: [0, 1]
      },
      {
        duration: 100 * speedFactor,
        fill: `both`,
        easing: `ease-in`
      }
    );
    const baseSpeed = 2 * speedFactor;
    const actionSpeed = 0.55 * speedFactor;
    const turnSpeed = 100 * speedFactor;
    const turns = +shape.dataset.turns;
    const turnDir = i % 2 ? -1 : 1;
    const turnDuration = turnSpeed * turns;
    const mirrorDir = mirror ? -1 : 1;

    const rotateEffect = Effect(
      [
        {
          transform: `rotate(${turns * 90 * turnDir * mirrorDir}deg)`
        },
        { transform: `rotate(0)` }
      ],
      {
        duration: turnDuration,
        fill: `both`,
        composite: `add`,
        easing: `ease-in-out`,
        delay: 30
      }
    );
    const slideEffect = Effect(
      {
        left: [`${initLeftOffset}px`, `${shapeX * boxSize}px`]
      },
      {
        duration: slideDistance * baseSpeed,
        fill: `both`,
        easing: `ease-in-out`
      }
    );
    const preDropDistanceAbs = Math.max(
      slideDistance,
      turnDuration / baseSpeed
    );
    const preDropDistance = preDropDistanceAbs * mirrorDir;
    const preDropDuration = Math.max(
      preDropDistanceAbs * baseSpeed,
      turnDuration
    );
    const preDropEffect = Effect(
      {
        top: [`${offsetTop}px`, `${offsetTop + preDropDistance}px`]
      },
      {
        duration: preDropDuration,
        fill: `both`
      }
    );
    const fallDuration =
      fallDistance * actionSpeed - preDropDistanceAbs * actionSpeed;
    const dropEffect = Effect(
      {
        top: [`${offsetTop + preDropDistance}px`, `${shapeY * boxSize}px`]
      },
      {
        duration: fallDuration,
        fill: `forwards`,
        easing: `ease-in`,
        endDelay: i + 1 === shapes.length ? config.hideDelay : 0
      }
    );

    const dropSteps = new SequenceEffect([
      fadeInEffect,
      new GroupEffect([
        slideEffect, //
        preDropEffect,
        rotateEffect
      ]),
      dropEffect
    ]);

    return dropSteps;
  });
  return new SequenceEffect(shapeSteps);
};

const o0 = {
  opacity: 0
};
const o1 = {
  opacity: 1
};
const blinkIn = el =>
  new KeyframeEffect(el, [o0, o1, o0, o1], {
    duration: 250
  });

export const hideLetter = (letter, mirror) => {
  const cover = letter.querySelector(`.Cover`);
  const container = letter.querySelector(`.Letter-container`);
  const lines = +letter.dataset.height;
  const mirrorDir = mirror ? -1 : 1;
  const steps = Array.from({ length: lines }, (_, n) => {
    const top = `${(n + 1) * boxSize * mirrorDir}px`;
    const lower = new KeyframeEffect(
      container,
      [
        {
          top: `${n * boxSize * mirrorDir}px`
        },
        {
          top
        }
      ],
      {
        duration: 100,
        easing: `ease-in`,
        fill: `forwards`
      }
    );
    return new SequenceEffect([blinkIn(cover), lower]);
  });
  return new SequenceEffect(steps);
};
