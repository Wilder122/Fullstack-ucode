function calculateTime() {
    const startDate = new Date('1939-01-01');
    const now = new Date();

    const diffTime = now - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const years = Math.floor(diffDays / 365.25);
    const remainingDaysAfterYears = diffDays % 365.25;

    const months = Math.floor(remainingDaysAfterYears / 30.44);
    const days = Math.floor(remainingDaysAfterYears % 30.44);

    return { years: () => years, months: () => months, days: () => days };
}

module.exports = { calculateTime };