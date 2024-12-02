function calculateTime() {
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

module.exports = { calculateTime };