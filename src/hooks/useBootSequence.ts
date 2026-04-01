import { useEffect, useState } from 'react';

export type BootPhase = 'off' | 'flicker' | 'desktop' | 'window-slide' | 'ready';

export function useBootSequence(skipBoot = false): { phase: BootPhase } {
  const [phase, setPhase] = useState<BootPhase>(skipBoot ? 'ready' : 'off');

  useEffect(() => {
    if (skipBoot) return;

    const t1 = setTimeout(() => setPhase('flicker'),      10);
    const t2 = setTimeout(() => setPhase('desktop'),      410);
    const t3 = setTimeout(() => setPhase('window-slide'), 1010);
    const t4 = setTimeout(() => setPhase('ready'),        1510);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [skipBoot]);

  return { phase };
}
