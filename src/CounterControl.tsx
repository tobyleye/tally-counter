import { useRef, useState } from "react";
import { motion, useDragControls,  Point, PanInfo, } from "framer-motion";


type cb = () => void;

const is = {
    increment: (offset: Point ) => offset.x > 50,
    decrement: (offset: Point) => offset.x < -50,
    reset: (offset: Point) => offset.y > 100,
  };

export function CounterControl({
  count,
  increment,
  decrement,
  reset,
}: {
  count: number;
  increment: cb;
  decrement: cb;
  reset: cb;
}) {

  const [opp, setOpp] = useState<null |  "reset" | "increment" | "decrement">(null);
  const nodeRef = useRef(null);

  const [axis, setAxis] = useState<string>();
  const containerRef = useRef(null);

  const ballConstraintRef = useRef(null);


  const controls = useDragControls();

  const handleDrag = (event: any, info: PanInfo) => {
    const { offset } = info;
    if (is.increment(offset)) {
      setOpp("increment");
    } else if (is.decrement(offset)) {
      setOpp("decrement");
    } else if (is.reset(offset)) {
      setOpp("reset");
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const offset = info.offset;
    if (axis === "x") {
      if (is.increment(offset)) {
        increment();
      } else if (is.decrement(offset)) {
        decrement();
      }
    } else if (axis === "y" && is.reset(offset)) {
      reset();
    }

    setOpp(null);
  };

  return (
    <>
      <div className="counter-container" ref={containerRef}>
        <motion.div
          drag
          dragTransition={{
            bounceStiffness: 200,
            bounceDamping: 14,
          }}
          dragListener={false}
          dragSnapToOrigin
          dragDirectionLock
          dragConstraints={containerRef}
          dragControls={controls}
          className={"counter " + (opp !== null ? `-${opp} -fade` : "")}
          dragElastic={0.09}
        >
          <button className="ctrl decrement" onClick={decrement}>
            -
          </button>
          <motion.div className="reset">&times;</motion.div>
          <div className="ball-container">
            <div className="ball-constraint" ref={ballConstraintRef} />
            <motion.button
              onPointerDown={(event) => {
                controls.start(event);
              }}
              dragPropagation
              onClick={increment}
              className="text ball"
              drag
              dragSnapToOrigin
              dragDirectionLock
              dragConstraints={ballConstraintRef}
              onDirectionLock={(axis) => setAxis(axis)}
              dragElastic={{ top: 0.2, bottom: 0.2, right: 0.3, left: 0.3 }}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
              dragTransition={{
                bounceStiffness: 240,
                bounceDamping: 14,
              }}
            >
              <span ref={nodeRef} className="ball-text">
                {count}
              </span>
            </motion.button>
          </div>

          <button className="ctrl increment" onClick={increment}>
            +
          </button>
        </motion.div>
      </div>
    </>
  );
}
