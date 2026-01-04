import { useState, useCallback } from 'react';

export function useHistory<T>(initialState: T) {
  const [state, setState] = useState<T>(initialState);
  const [past, setPast] = useState<T[]>([]);
  const [future, setFuture] = useState<T[]>([]);

  const undo = useCallback(() => {
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    setFuture([state, ...future]);
    setPast(newPast);
    setState(previous);
  }, [past, state, future]);

  const redo = useCallback(() => {
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    setPast([...past, state]);
    setFuture(newFuture);
    setState(next);
  }, [future, state, past]);

  const set = useCallback(
    (newS: T) => {
      if (JSON.stringify(newS) === JSON.stringify(state)) return;
      setPast((p) => [...p, state].slice(-50));
      setState(newS);
      setFuture([]);
    },
    [state]
  );

  const reset = useCallback((newS: T) => {
    setState(newS);
    setPast([]);
    setFuture([]);
  }, []);

  return {
    state,
    set,
    undo,
    redo,
    reset,
    canUndo: past.length > 0,
    canRedo: future.length > 0,
  };
}
