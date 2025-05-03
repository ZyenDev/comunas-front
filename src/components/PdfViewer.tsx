// src/components/PDFViewer.tsx
// import { Document, Page, pdfjs } from "react-pdf";

const PDFViewer: React.FC = () => {
  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src="/ConstanciaDeResidenciaLosGodos.pdf"
        width="100%"
        height="100%"
        title="PDF Viewer"
      >
        <p>
          Your browser does not support PDFs.
          <a href="/ConstanciaDeResidenciaLosGodos.pdf">Download the PDF</a>.
        </p>
      </iframe>
    </div>
  );
};

export default PDFViewer;
