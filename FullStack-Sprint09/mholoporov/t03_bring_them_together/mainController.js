exports.mainPage = (req, res) => {
    res.sendFile(`${__dirname}/views/main.html`);
};
