const express = require('express');
const router = express.Router();

function calculateNormalTime() {
    const startDate = new Date('1939-01-01');
    const now = new Date();

    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365.25);
    const remainingDaysAfterYears = diffDays % 365.25;

    const months = Math.floor(remainingDaysAfterYears / 30.44);
    const days = Math.floor(remainingDaysAfterYears % 30.44);

    return { years, months, days };
}

router.get('/', (req, res) => {
    const time = calculateNormalTime();
    res.render('normal', { years: time.years, months: time.months, days: time.days });
});

module.exports = router;