import React from 'react';
import { useTerminalState } from '../../hooks/useTerminalState';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';

const TerminalEngine: React.FC = () => {
  const { history, input, setInput, handleCommand, handleKeyDown } = useTerminalState();

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#1E1E1E' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <TerminalOutput history={history} />
      </div>
      <TerminalInput
        input={input}
        setInput={setInput}
        handleCommand={handleCommand}
        handleKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default TerminalEngine;
