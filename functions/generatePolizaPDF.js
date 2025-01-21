const {onCall, HttpsError} = require("firebase-functions/v2/https");
const puppeteer = require("puppeteer");


exports.generatePolizaPDF = onCall(
    {
        memory: "1GiB",
        timeoutSeconds: 120,
        allowUnauthenticated: true,
    },async (request) => {
    try {
        // Extract input data
        const { policyData } = request.data;
        if (!policyData) {
            throw new HttpsError(
                "invalid-argument",
                "Policy data is required to generate the PDF."
            );
        }

        // HTML Template
        const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Poliza de Seguro</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <h1>Poliza de Seguro</h1>
        <p><strong>Asegurado:</strong> ${policyData.insuredName}</p>
        <p><strong>Número de Póliza:</strong> ${policyData.policyNumber}</p>
        <p><strong>Vigencia:</strong> ${policyData.startDate} - ${policyData.endDate}</p>
        <h2>Detalles:</h2>
        <table>
          <tr>
            <th>Tipo</th>
            <th>Descripción</th>
          </tr>
          ${policyData.coverages
            .map(
                (coverage) => `
            <tr>
              <td>${coverage.type}</td>
              <td>${coverage.description}</td>
            </tr>
          `
            )
            .join("")}
        </table>
      </body>
      </html>
    `;

        // Launch Puppeteer
        const browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
            headless: true,  // or 'new' for Puppeteer 20+
        }); // Use 'headless: "new"' for modern Puppeteer versions
        const page = await browser.newPage();

        // Set HTML content
        await page.setContent(htmlTemplate, { waitUntil: "networkidle0" });

        // Generate PDF
        const pdf = await page.pdf({
            format: "A4",
            printBackground: true,
        });
        const pdfBuffer = Buffer.from(pdf)
        // Close Puppeteer
        await browser.close();
        console.log("pdf buffer", pdfBuffer.toString("base64").slice(0, 100))
        // Return the PDF as a base64 string
        return { pdfBase64: pdfBuffer.toString("base64") };
    } catch (error) {
        console.error("Error generating PDF:", error);
        throw new HttpsError("internal", "Unable to generate PDF.");
    }
});