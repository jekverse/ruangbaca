import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfViewer({ pdfPath }) {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function zoomIn() {
    setScale(prev => Math.min(prev + 0.2, 3.0));
  }
  
  function zoomOut() {
    setScale(prev => Math.max(prev - 0.2, 0.5));
  }

  return (
    <div className="flex flex-col items-center p-4 min-h-full">
      <div className="bg-white shadow-lg rounded-xl p-3 mb-6 sticky top-4 z-20 flex items-center space-x-4 border border-gray-200">
        <div className="flex space-x-2 pl-2 pr-2">
          <button
            type="button"
            onClick={zoomOut}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            title="Zoom Out"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
            </svg>
          </button>
          <span className="flex items-center text-sm font-medium text-gray-700 w-12 justify-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            type="button"
            onClick={zoomIn}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 transition-colors"
            title="Zoom In"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 w-full max-w-5xl flex flex-col items-center">
        <Document
          file={pdfPath}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col gap-6"
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
            <div key={`page_${index + 1}`} className="shadow-xl border border-gray-200 bg-white">
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
