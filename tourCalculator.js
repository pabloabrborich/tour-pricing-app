class TourCalculator {
    constructor() {
        this.hotelCosts = {
            'económico': 40,
            'turista': 45,
            'superior turista': 65,
            'primera clase': 100,
            'lujo': 330
        };
        this.tourGuideCostPerDay = 30;
        this.baseMealCost = 9;
    }

    calculateTotalCost(airfare, numAdults, numChildren, hotelType, numNights, additionalTours, discount, mealUpgrade) {
        let numDays = numNights + 1;
        let totalAirfare = 0;
        if (airfare > 0) {
            let totalAirfareAdults = airfare * numAdults;
            let totalAirfareChildren = (airfare - 50) * numChildren;
            totalAirfare = totalAirfareAdults + totalAirfareChildren;
        }

        let totalHotelCost = this.hotelCosts[hotelType] * (numAdults + numChildren) * numNights;
        let totalTourGuideCost = this.tourGuideCostPerDay * numDays * (numAdults + numChildren);
        let totalMealCost = (this.baseMealCost + mealUpgrade) * 2 * numNights * (numAdults + numChildren);
        let totalAdditionalTours = additionalTours.reduce((acc, curr) => acc + curr, 0) * (numAdults + numChildren);

        let totalCost = totalAirfare + totalHotelCost + totalTourGuideCost + totalMealCost + totalAdditionalTours;
        let commission = totalCost * 0.25;
        let totalWithCommission = totalCost + commission;
        let discountAmount = totalWithCommission * (discount / 100);
        let finalCost = totalWithCommission - discountAmount;

        return numAdults + numChildren === 0 ? 0 : finalCost / (numAdults + numChildren);
    }

    generateProforma(clientName, destination, airfare, numAdults, numChildren, numNights, roomCounts, additionalTours, discount, mealUpgrade, departureDate, returnDate) {
        let today = new Date().toLocaleDateString('en-GB');
        let year = new Date().getFullYear();
        let reservationCode = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

        let proforma = {
            "Fecha de Proforma": `${today}/${year}`,
            "Proforma Número": reservationCode,
            "Nombre del Cliente": clientName,
            "Destino": destination,
            "Fecha de Salida": `${departureDate}/${year}`,
            "Fecha de Regreso": `${returnDate}/${year}`,
            "Número de Adultos": numAdults,
            "Número de Niños": numChildren,
            "Número de Noches": numNights,
            "Categorías de Habitaciones y Precios": []
        };

        Object.keys(this.hotelCosts).forEach(hotelType => {
            let totalCostPerAdult = this.calculateTotalCost(airfare, numAdults, 0, hotelType, numNights, additionalTours, discount, mealUpgrade);
            let totalCostPerChild = this.calculateTotalCost(airfare, 0, numChildren, hotelType, numNights, additionalTours, discount, mealUpgrade);
            proforma["Categorías de Habitaciones y Precios"].push({
                "Categoría": hotelType.charAt(0).toUpperCase() + hotelType.slice(1),
                "Precio por Adulto": `$${totalCostPerAdult.toFixed(2)}`,
                "Precio por Niño": `$${totalCostPerChild.toFixed(2)}`
            });
        });

        proforma["Nota Importante"] = "Variabilidad de Tarifas: Las tarifas están sujetas a ajustes debido a cambios en las tarifas aéreas. La tarifa final se establece con la confirmación de la reserva.\nDocumentación Requerida para Reserva: Se requieren copias de cédula y/o pasaportes, las cuales pueden ser enviadas por correo electrónico, WhatsApp, Telegram, WeChat o Signal.\nValidez de las Tarifas: Las tarifas tienen una validez de 24 a 72 horas. Recomendamos efectuar su reserva lo antes posible para asegurar las mejores tarifas.\nOpciones de Pago: Aceptamos pagos mediante Tarjetas de Crédito, Depósitos Bancarios y Transferencias Electrónicas.";

        return proforma;
    }
}
