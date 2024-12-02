const express = require('express');
const router = express.Router();

function calculateQuantumTime() {
    const startDate = new Date('1939-01-01');
    const now = new Date();

    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Calculate the equivalent quantum time
    const totalQuantumDays = diffDays / 7;

    const quantumYears = Math.floor(totalQuantumDays / 365.25);
    const remainingDaysAfterQuantumYears = totalQuantumDays % 365.25;

    const quantumMonths = Math.floor(remainingDaysAfterQuantumYears / 30.44);
    const quantumDays = Math.floor(remainingDaysAfterQuantumYears % 30.44);

    return [quantumYears, quantumMonths, quantumDays];
}

router.get('/', (req, res) => {
    const time = calculateQuantumTime();
    res.render('quantum', { years: time[0], months: time[1], days: time[2] });
});

module.exports = router;