const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateCertificate =
async (req, res) => {

  const fileName =
    `certificate-${Date.now()}.pdf`;

  const certificateDir =
    path.join(
      __dirname,
      "../../certificates"
    );

  if (!fs.existsSync(certificateDir)) {
    fs.mkdirSync(certificateDir, {
      recursive: true
    });
  }

  const filePath =
    path.join(
      certificateDir,
      fileName
    );

  const doc = new PDFDocument();

  doc.pipe(
    fs.createWriteStream(filePath)
  );

  doc.fontSize(24)
     .text(
       "Certificate of Participation",
       { align: "center" }
     );

  doc.moveDown();

  doc.fontSize(16)
     .text(
       "Awarded to Volunteer",
       { align: "center" }
     );

  doc.moveDown();

  doc.text(
    `Generated on ${new Date().toDateString()}`,
    { align: "center" }
  );

  doc.end();

  res.json({
    message:
      "Certificate generated",
    fileName
  });

};