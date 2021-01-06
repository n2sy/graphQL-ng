const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Quote {
        _id : ID!
        text : String!
        author : String!
    }
    type QuoteData {
        allQuotes : [Quote!]!
    }
    input QuoteInputData {
        text : String!
        author : String!
    }
    type RootQuery {
        quotes : QuoteData!
    }
    type RootMutation {
        createQuote(quoteInput: QuoteInputData) : Quote!
        updateQuote(id : ID!, quoteInput : QuoteInputData): Quote!
        deleteQuote(id : ID!): Quote!
    }
    schema {
        query : RootQuery
        mutation : RootMutation
    }
`);