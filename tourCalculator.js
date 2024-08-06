document.getElementById('tourForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collecting form data
    const clientName = document.getElementById('clientName').value;
    const airfare = parseFloat(document.getElementById('airfare').value);
    const numAdults = parseInt(document.getElementById('numAdults').value, 10);
    const numChildren = parseInt(document.getElementById('numChildren').value, 10);
    const numNights = parseInt(document.getElementById('numNights').value, 10);
    const discount = parseFloat(document.getElementById('discount').value || 0);

    // Calculate total cost
    const totalCost = calculateTotalCost(airfare, numAdults, numChildren, numNights, discount);

    // Generate PDF
    generatePDF(clientName, totalCost);
});

function calculateTotalCost(airfare, numAdults, numChildren, numNights, discount) {
    const baseCostPerNight = 100; // Assuming a base cost per night per person
    const totalBaseCost = (airfare + (baseCostPerNight * numNights)) * (numAdults + numChildren);
    const discountedCost = totalBaseCost * (1 - discount / 100);
    return discountedCost;
}

function generatePDF(clientName, totalCost) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Tour Pricing Report', 10, 10);
    doc.text(`Client Name: ${clientName}`, 10, 20);
    doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 10, 30);

    doc.save('tour-pricing-report.pdf');
}
