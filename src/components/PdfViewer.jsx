import { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({ pdfPath }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function zoomIn() {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }
  
  function zoomOut() {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }

  function scrollToPage(pageIndex) {
    if (pageIndex >= 1 && pageIndex <= numPages) {
      const element = document.getElementById(`pdf-page-${pageIndex}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setCurrentPage(pageIndex);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(err => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  // Intersection Observer to track current page while scrolling
  useEffect(() => {
    if (!numPages) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageNum = parseInt(entry.target.getAttribute('data-page-number'), 10);
            if (!isNaN(pageNum)) {
              setCurrentPage(pageNum);
            }
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    for (let i = 1; i <= numPages; i++) {
      const el = document.getElementById(`pdf-page-${i}`);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [numPages]);

  return (
    <div ref={containerRef} className="flex flex-col items-center p-4 min-h-screen bg-gray-50/50">
      <div className="bg-white shadow-lg rounded-xl p-2 sm:p-3 mb-6 sticky top-4 z-20 flex items-center justify-between border border-gray-200 w-full max-w-5xl">
        
        {/* Left: Prev/Next & Page Indicator */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-r border-gray-200 pr-2 sm:pr-4">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => scrollToPage(currentPage - 1)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-gray-700 transition-colors"
            title="Previous Page"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="flex items-center text-xs sm:text-sm font-medium text-gray-700 px-1 sm:px-2 whitespace-nowrap">
            {currentPage} / {numPages || '--'}
          </span>
          <button
            type="button"
            disabled={currentPage >= numPages}
            onClick={() => scrollToPage(currentPage + 1)}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent text-gray-700 transition-colors"
            title="Next Page"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Middle: Zoom Controls */}
        <div className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 flex-1 justify-center">
          <button
            type="button"
            onClick={zoomOut}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            title="Zoom Out"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <span className="flex items-center text-xs sm:text-sm font-medium text-gray-700 w-10 sm:w-12 justify-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            title="Zoom In"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
        </div>

        {/* Right: Utils (Fullscreen & Download) */}
        <div className="flex items-center space-x-1 sm:space-x-2 border-l border-gray-200 pl-2 sm:pl-4">
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors hidden sm:block"
            title="Fullscreen"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <a
            href={pdfPath}
            download
            className="p-1.5 sm:p-2 rounded-lg hover:bg-indigo-50 text-indigo-600 transition-colors flex items-center"
            title="Download PDF"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl flex flex-col items-center relative overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col gap-6 items-center"
          loading={
            <div className="flex items-center justify-center p-20 text-indigo-600">
              <svg className="animate-spin h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          }
          error={
            <div className="p-10 text-red-500 bg-red-50 rounded-lg m-4 border border-red-200 shadow-sm">
              Failed to load PDF file. Please ensure the file exists at the specified path.
            </div>
          }
        >
          {Array.from(new Array(numPages || 0), (el, index) => (
            <div 
              key={`page_${index + 1}`} 
              id={`pdf-page-${index + 1}`}
              data-page-number={index + 1}
              className="shadow-xl border border-gray-200 bg-white"
            >
              <Page 
                pageNumber={index + 1} 
                scale={scale} 
                renderTextLayer={true}
                renderAnnotationLayer={true}
                className="pdf-page-container"
              />
            </div>
          ))}
        </Document>
      </div>
    </div>
  );
}
