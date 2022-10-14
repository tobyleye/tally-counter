import { CounterControl } from "./CounterControl";
import "./counter.scss";
import { useCounter } from "./useCounter";

export function Counter() {
  const [count, { increment, decrement, reset }] = useCounter();
  return (
    <CounterControl
      count={count}
      increment={increment}
      decrement={decrement}
      reset={reset}
    />
  );
}
