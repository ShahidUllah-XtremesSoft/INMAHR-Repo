// Import the required pdf-lib modules
//const { PDFDocument, rgb } = PDFLib;

/*
async function generateAndModifyPDF() {
    // Fetch the existing PDF
    const existingPdfBytes = ... // Load the existing PDF bytes
    const existingPdfBytes = fs.readFileSync('path/to/existing_pdf.pdf');


    // Load the existing PDF
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Get the form fields from the PDF (modify as per your PDF structure)
    const form = pdfDoc.getForm();

    // Set dynamic input field data
    form.getTextField('fieldName').setText('Dynamic Value'); // Modify field with name 'fieldName'

    // Serialize the modified PDF
    const modifiedPdfBytes = await pdfDoc.save();

    // Create a Blob and initiate a download
    const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(modifiedPdfBlob);
    link.download = 'modified_pdf.pdf';
    link.click();
}

// Attach a click event to the button
document.getElementById('generatePDF').addEventListener('click', generateAndModifyPDF);

*/
/*
$(function () {
    const fs = require('fs');
    const { PDFDocument } = require('pdf-lib');

});
// Function to read and modify the PDF
async function modifyPDF() {
    debugger
    //const existingPdfBytes = fs.readFileSync('path/to/existing_pdf.pdf');
    const existingPdfBytes = fs.readFileSync('~/Temp/form.pdf');


    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const form = pdfDoc.getForm();

    // Set dynamic input field data
    const textField = form.getTextField('fieldName');
    if (textField) {
        textField.setText('Dynamic Value');
    } else {
        // Handle if the field with the given name doesn't exist
        console.error('Field not found');
    }

    const modifiedPdfBytes = await pdfDoc.save();
    return modifiedPdfBytes;
}

// Example of using the function
modifyPDF().then((modifiedPdfBytes) => {
    fs.writeFileSync('path/to/modified_pdf.pdf', modifiedPdfBytes);
    console.log('PDF modified successfully');
}).catch((err) => {
    console.error('Error modifying PDF:', err);
});

*/

// Assuming you have a function to fetch PDF bytes from the server
async function fetchExistingPdfBytes() {
    // Your logic to fetch existing PDF bytes
    // Example: Use fetch API to get the PDF bytes
     const response = await fetch('/Temp/form.pdf');
   // const response = readTextFile("/Temp/form.pdf");

    

    if (response.ok) {
        return await response.arrayBuffer();
    } else {
        throw new Error('Failed to fetch PDF');
    }
}

// Function to generate and modify the PDF
async function generateAndModifyPDF() {
    try {
        const existingPdfBytes = await fetchExistingPdfBytes();
    debugger

        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        debugger
        const form = pdfDoc.getForm();

        // Set dynamic input field data
        form.getTextField('fieldName').setText('Dynamic Value');

        const modifiedPdfBytes = await pdfDoc.save();

        const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(modifiedPdfBlob);
        link.download = 'modified_pdf.pdf';
        link.click();
    } catch (error) {
        console.log('Error:', error);
    }
}
 