import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Set up worker
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PdfCover({ pdfPath }) {
  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center p-2 pointer-events-none">
      <Document 
        file={pdfPath} 
        loading={<div className="text-gray-400 text-xs text-center">Loading cover...</div>}
        error={<div className="text-red-400 text-xs text-center px-2">Cover unavailable</div>}
        className="w-full h-full flex items-center justify-center"
      >
        <Page 
          pageNumber={1} 
          renderTextLayer={false} 
          renderAnnotationLayer={false}
          className="shadow-sm border border-gray-200"
          height={200}
        />
      </Document>
    </div>
  );
}
