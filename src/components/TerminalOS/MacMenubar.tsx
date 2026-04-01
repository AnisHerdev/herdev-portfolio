import React, { useEffect, useState } from 'react';

const MacMenubar: React.FC = () => {
  const [clock, setClock] = useState('');

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const weekday = now.toLocaleDateString('en-US', { weekday: 'short' });
      const day     = now.getDate();
      const month   = now.toLocaleDateString('en-US', { month: 'short' });
      const time    = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      setClock(`${weekday} ${day} ${month}  ${time}`);
    };
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);

  const menuItems = ['Terminal', 'Shell', 'Edit', 'View', 'Window', 'Help'];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 28,
        background: 'rgba(30,30,30,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 16px',
        userSelect: 'none',
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        {/* Apple logo */}
        <svg width="13" height="16" viewBox="0 0 814 1000" fill="white" style={{ opacity: 0.9, cursor: 'default' }}>
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.5-155.5-103.6c-42.7-58-82.3-143.8-82.3-225.1 0-159.8 104.6-244.6 207.8-244.6 77 0 128.3 50.5 170.9 50.5 40.7 0 101.1-54.4 188.2-54.4zm-174.7-119.9c30.7-36.6 53.1-88.2 53.1-139.9 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.9 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.1z"/>
        </svg>

        {menuItems.map(item => (
          <span
            key={item}
            style={{
              color: item === 'Terminal' ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.7)',
              fontSize: 13,
              fontWeight: item === 'Terminal' ? 600 : 500,
              cursor: 'default',
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Wifi icon */}
        <svg width="16" height="12" viewBox="0 0 24 18" fill="rgba(255,255,255,0.7)">
          <path d="M12 4.5C7.5 4.5 3.5 6.5 0.7 9.7l2.1 2.1C5 9.3 8.3 7.5 12 7.5s7 1.8 9.2 4.3l2.1-2.1C20.5 6.5 16.5 4.5 12 4.5z" opacity="0.4"/>
          <path d="M12 8.5c-2.8 0-5.3 1.2-7 3.1l2.1 2.1c1.1-1.3 2.7-2.2 4.9-2.2s3.8.9 4.9 2.2l2.1-2.1c-1.7-1.9-4.2-3.1-7-3.1z" opacity="0.7"/>
          <path d="M12 12.5c-1.4 0-2.6.6-3.5 1.5l3.5 3.5 3.5-3.5c-.9-.9-2.1-1.5-3.5-1.5z"/>
        </svg>

        {/* Battery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 2, color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>
          <div
            style={{
              width: 22,
              height: 11,
              border: '1px solid rgba(255,255,255,0.5)',
              borderRadius: 2,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              padding: 1,
            }}
          >
            <div
              style={{
                width: '75%',
                height: '100%',
                background: '#3FD559',
                borderRadius: 1,
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: -4,
                width: 3,
                height: 5,
                background: 'rgba(255,255,255,0.5)',
                borderRadius: '0 1px 1px 0',
              }}
            />
          </div>
        </div>

        {/* Clock */}
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 500, fontFamily: 'system-ui, sans-serif' }}>
          {clock}
        </span>
      </div>
    </div>
  );
};

export default MacMenubar;
