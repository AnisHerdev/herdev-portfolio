import { useEffect, useState } from 'react';

export type BootPhase = 'off' | 'flicker' | 'ubuntu-boot' | 'desktop' | 'window-slide' | 'ready';

export function useBootSequence(skipBoot = false): { phase: BootPhase } {
  const [phase, setPhase] = useState<BootPhase>(skipBoot ? 'ready' : 'off');

  useEffect(() => {
    if (skipBoot) return;

    const t1 = setTimeout(() => setPhase('flicker'),       10);
    const t2 = setTimeout(() => setPhase('ubuntu-boot'),  410);
    const t3 = setTimeout(() => setPhase('desktop'),      3800);
    const t4 = setTimeout(() => setPhase('window-slide'), 4400);
    const t5 = setTimeout(() => setPhase('ready'),        4900);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [skipBoot]);

  return { phase };
}
