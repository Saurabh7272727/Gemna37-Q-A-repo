import PDFDocument from 'pdfkit';

function generatePdfBuffer(templateData) {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A4', margin: 50 });
            const chunks = [];

            // Collect the PDF data
            doc.on('data', (chunk) => chunks.push(chunk));
            doc.on('end', () => resolve(Buffer.concat(chunks)));

            // Simple PDF contents
            doc.fontSize(12).text(`GEMID - ${templateData.GEMID}`);
            doc.moveDown();
            doc.fontSize(12).text(`NAME-${templateData.firstName.toUpperCase()} ${templateData.lastName.toUpperCase()}`);
            doc.moveDown();
            doc.fontSize(12).text(`FATHER_NAME-${templateData.fatherName.toUpperCase()}`);
            doc.moveDown();
            doc.fontSize(12).text(`MOTHER_NAME-${templateData.motherName.toUpperCase()}`);
            doc.moveDown();
            doc.fontSize(12).text(`COURSE-${templateData?.course.value?.toUpperCase()} BRANCH-${templateData?.branch.value.toUpperCase()}`);
            doc.moveDown();
            doc.fontSize(12).text(`YEAR-${templateData?.year.value.toUpperCase()}`);
            doc.moveDown();
            doc.text('Generated on: ' + new Date().toLocaleString());
            doc.end();

        } catch (err) {
            reject(err);
            console.error(err);
        }
    });
}

export default generatePdfBuffer;
