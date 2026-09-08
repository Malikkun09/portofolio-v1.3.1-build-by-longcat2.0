import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-oled-border py-12 md:py-16 px-6 md:px-8 lg:px-12 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-start md:items-center text-left md:text-center">
        <h4 className="font-satoshi font-bold text-sm tracking-wider text-primary">
          MALIK FAJAR
        </h4>
        <p className="text-xs text-secondary tracking-widest uppercase mt-2">
          SOFTWARE DEVELOPER / AI ENGINEER
        </p>
        <p className="text-xs text-muted tracking-wider mt-1">
          CIMAHI, INDONESIA
        </p>
        <p className="text-xs text-muted mt-4">
          © 2026
        </p>
      </div>
    </footer>
  );
}
