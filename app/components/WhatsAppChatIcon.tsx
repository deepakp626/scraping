'use client';

import React from 'react';

const WhatsAppChatIcon = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center group">
      {/* Tooltip */}
      <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mb-2 px-3 py-1.5 bg-slate-900 text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap border border-white/10">
        Chat with us
      </div>

      <a 
        href="https://wa.me/123456789" 
        target="_blank" 
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-lg hover:shadow-[#25D366]/40 transition-all duration-300 hover:-translate-y-1"
        aria-label="Chat on WhatsApp"
      >
        {/* Pulse effect ring */}
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-40 animate-ping"></span>
        
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="z-10 relative"
          stroke="none"
        >
          <path d="M12.031 0C5.385 0 0 5.385 0 12.031c0 2.126.551 4.137 1.545 5.918L.044 24l6.19-1.62c1.722.9 3.655 1.383 5.797 1.383 6.646 0 12.031-5.385 12.031-12.031S18.677 0 12.031 0zm0 21.723c-1.802 0-3.564-.482-5.111-1.398l-.367-.217-3.792.993 1.011-3.69-.238-.378a9.96 9.96 0 0 1-1.543-5.328c0-5.526 4.496-10.022 10.022-10.022 5.526 0 10.022 4.496 10.022 10.022S17.557 21.723 12.031 21.723zm5.508-7.519c-.302-.151-1.787-.881-2.062-.982-.276-.1-.478-.151-.679.151-.201.302-.781.982-.958 1.183-.176.202-.353.227-.655.076-.302-.151-1.275-.47-2.428-1.501-.897-.803-1.502-1.796-1.678-2.099-.176-.302-.019-.465.132-.615.136-.136.302-.353.453-.529.151-.176.201-.302.302-.504.101-.202.05-.378-.025-.529-.076-.151-.679-1.638-.931-2.242-.244-.588-.493-.509-.679-.518-.176-.009-.378-.009-.579-.009-.201 0-.529.076-.806.378-.277.302-1.058 1.034-1.058 2.519s1.083 2.923 1.234 3.124c.151.202 2.129 3.245 5.155 4.549.719.311 1.28.497 1.716.636.721.23 1.378.197 1.897.12.58-.086 1.787-.73 2.039-1.436.252-.705.252-1.309.176-1.436-.076-.126-.277-.202-.579-.353z" />
        </svg>
      </a>
    </div>
  );
};

export default WhatsAppChatIcon;
