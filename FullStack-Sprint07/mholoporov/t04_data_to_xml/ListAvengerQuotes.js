const AvengerQuote = require('./AvengerQuote');
const fs = require('fs');
const xml2js = require('xml2js');

class ListAvengerQuotes {
    constructor() {
        this.quotes = [];
    }

    addQuote(quote) {
        this.quotes.push(quote);
    }

    toXML(fileName) {
        const builder = new xml2js.Builder({
            rootName: 'quotes',
            xmldec: { 'version': '1.0', 'encoding': 'UTF-8' },
            renderOpts: { 'pretty': true }
        });

        const xml = builder.buildObject({ quote: this.quotes.map(q => ({
            id: q.id,
            author: q.author,
            quote: q.quote,
            photo: q.photo.join(','),
            publishDate: q.publishDate,
            comments: Object.keys(q.comments).map(date => ({
                date: date,
                _: q.comments[date]
            }))
        })) });

        fs.writeFileSync(fileName, xml);
    }

    fromXML(fileName) {
        const xml = fs.readFileSync(fileName, 'utf8');
        xml2js.parseString(xml, (err, result) => {
            if (err) throw err;
            this.quotes = result.quotes.quote.map(q => new AvengerQuote(
                parseInt(q.id[0]),
                q.author[0],
                q.quote[0],
                q.photo[0].split(','),
                q.publishDate[0],
                q.comments.reduce((acc, curr) => {
                    acc[curr.date[0]] = curr._;
                    return acc;
                }, {})
            ));
        });
    }
}

module.exports = ListAvengerQuotes;