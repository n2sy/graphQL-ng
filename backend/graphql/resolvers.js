const Quote = require('../models/quote');

module.exports = {
    quotes : async function() {
        const quotes = await Quote.find();
        return {
            allQuotes : quotes.map((q) => {
                return {
                    ...q._doc,
                    _id: q._id.toString(), //useless
                };
            })
        };
    },
    createQuote : async function({ quoteInput }) {
        const quote = new Quote({
            text : quoteInput.text,
            author : quoteInput.author
        });
        const createdQuote = await quote.save();
        return {
            // quote : createdQuote.quote,
            // author : createdQuote.author
            ...createdQuote._doc,
            _id : createdQuote._id.toString()
        }
    },
    updateQuote : async function({ id, quoteInput}) {
        const quote = await Quote.findById(id);
        if(!quote) {
            throw new Error('No quote found!');
        }
        quote.text = quoteInput.text;
        quote.author = quoteInput.author;
        const updateQuote = await quote.save();
        return {
            ...updateQuote._doc,
            _id : updateQuote._id.toString()
        }

    },
    deleteQuote : async function({ id }) {
        const quote = await Quote.findById(id, { useFindAndModify: false });
        if(!quote) {
            throw new Error('No quote found!');
        }
        await Quote.findByIdAndRemove(id);
        return {
            ...quote._doc,
            _id : quote._id.toString()
        }
    }
}