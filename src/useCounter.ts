import { useState } from "react";

export const useCounter = (): [
  number,
  { reset: () => void; increment: () => void; decrement: () => void }
] => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);

  const decrement = () => setCount(count > 0 ? count - 1 : 0);
  const reset = () => setCount(0);
  console.log("useCounter");
  return [
    count,
    {
      reset,
      increment,
      decrement,
    },
  ];
};
