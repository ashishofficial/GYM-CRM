/**
 * Capture an on-screen invoice element to PDF and trigger a browser download.
 * Lazy-imports jspdf + html2canvas so they only ship to clients that
 * actually click "Download".
 */
export async function downloadInvoice(elementId: string, filename: string) {
  if (typeof window === "undefined") return;

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Invoice element #${elementId} not found`);
  }

  const [{ default: html2canvas }, jspdfModule] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);
  const { jsPDF } = jspdfModule;

  // Render at 2x for crisp text on retina screens.
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: "#ffffff",
    useCORS: true,
    logging: false,
  });

  const imgData = canvas.toDataURL("image/png");

  // A4 portrait, mm units.
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Fit width with margin; preserve aspect ratio.
  const margin = 10;
  const usableWidth = pageWidth - margin * 2;
  const imgRatio = canvas.height / canvas.width;
  const imgWidth = usableWidth;
  const imgHeight = imgWidth * imgRatio;

  if (imgHeight <= pageHeight - margin * 2) {
    // Single page.
    pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
  } else {
    // Multi-page: slice the image vertically across pages.
    const pageContentHeight = pageHeight - margin * 2;
    let renderedHeight = 0;
    while (renderedHeight < imgHeight) {
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin - renderedHeight,
        imgWidth,
        imgHeight,
      );
      renderedHeight += pageContentHeight;
      if (renderedHeight < imgHeight) pdf.addPage();
    }
  }

  pdf.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}
