import React from 'react';
import { Star } from './Star';

export const Evaluation = ({ stars, maxStars }) => {
  let res = new Array(maxStars).fill(0);
  return res.map((_, i) => <Star key={i} state={i < stars}/>);
};

