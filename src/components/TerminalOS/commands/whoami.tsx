export interface TypewriterPayload {
  __type: 'typewriter';
  lines: string[];
}

export default function whoami(): TypewriterPayload {
  return {
    __type: 'typewriter',
    lines: [
      'S A Herdev Anish',
      '─────────────────────────────',
      'B.Tech (Hons.) CSE · RV University',
      'CGPA: 9.40 / 10  ·  Specialisation: AIML  ·  Minor: Fintech',
      'Bangalore, India',
      ' ',
      'Sharp. Creative. Driven.',
    ],
  };
}
