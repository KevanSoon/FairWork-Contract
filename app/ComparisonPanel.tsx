
import React, { useEffect } from 'react';

interface ComparisonPanelProps {
  html1: string;
  html2: string;
  onClose: () => void;
}

const ComparisonPanel: React.FC<ComparisonPanelProps> = ({ html1, html2, onClose }) => {

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);


  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fade-in"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full h-full max-w-7xl flex flex-col overflow-hidden transform animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800">Detailed Summary</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 transition-colors rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close panel"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>

        <main className="flex-grow flex flex-col md:flex-row gap-2 p-2 bg-gray-100">
          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-inner overflow-hidden border border-gray-200">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700 text-center">Summary</h3>
              </div>
              <iframe
                  srcDoc={html1}
                  title="Summary Sheet HTML"
                  className="w-full h-full border-0 flex-grow"
                  sandbox="allow-scripts"
              />
          </div>

          <div className="flex-1 flex flex-col bg-white rounded-lg shadow-inner overflow-hidden border border-gray-200">
              <div className="p-3 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-md font-semibold text-gray-700 text-center">Highlighted Keywords</h3>
              </div>
              <iframe
                  srcDoc={html2}
                  title="Debug Visualization HTML"
                  className="w-full h-full border-0 flex-grow"
                  sandbox="allow-scripts"
              />
          </div>
        </main>
      </div>
      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-up {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
            animation: scale-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ComparisonPanel;
