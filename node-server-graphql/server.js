const express = require('express');
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
        random: Float!
        rollDice(numDice: Int!, numSides: Int): [Int]
        getDie(numSides: Int): RandomDie
        ip: String
        user(id: String): User
    }

    type Mutation {
        createMessage(input: MessageInput): Message
        updateMessage(id: ID!, input: MessageInput): Message
    }

    type Message {
        id: ID!
        content: String
        author: String
    }
    
    type RandomDie {
        numSides: Int!
        rollOnce: Int!
        roll(numRolls: Int!): [Int]
    }

    type User {
        id: String
        name: String
    }
    
    input MessageInput {
        content: String
        author: String
    }
`);

class RandomDie {
    constructor(numSides) {
      this.numSides = numSides;
    }
  
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides);
    }
  
    roll({numRolls}) {
      var output = [];
      for (var i = 0; i < numRolls; i++) {
        output.push(this.rollOnce());
      }
      return output;
    }
}

// If Message had any complex fields, we'd put them on this object.
class Message {
    constructor(id, {content, author}) {
      this.id = id;
      this.content = content;
      this.author = author;
    }
}

const loggingMiddleware = (req, res, next) => {
    console.log('ip:', req.ip);
    next();
}  

// Maps username to content
const fakeDatabase = {
    'a': {
        id: 'a',
        name: 'alice',
    },
    'b': {
        id: 'b',
        name: 'bob',
    },
};

const root = {
    hello: () => {
        return 'Hello Word!';
    },

    random: () => {
        return Math.random();
    },

    rollDice: ({numDice, numSides}) => {
        const output = []
        for(var i = 0; i <= numDice; i++) {
            output.push(1 + Math.floor(Math.random() * (numSides || 6)))
        }

        return output
    },

    getDie: ({numSides}) => {
        return new RandomDie(numSides || 6);
    },

    getMessage: ({id}) => {
        if (!fakeDatabase[id]) {
            throw new Error('no message exists with id ' + id);
        }

        return new Message(id, fakeDatabase[id]);
    },

    createMessage: ({input}) => {
        // Create a random id for our "database".
        var id = require('crypto').randomBytes(10).toString('hex');
    
        fakeDatabase[id] = input;
        return new Message(id, input);
    },

    updateMessage: ({id, input}) => {
        if (!fakeDatabase[id]) {
          throw new Error('no message exists with id ' + id);
        }
        // This replaces all old data, but some apps might want partial update.
        fakeDatabase[id] = input;
        return new Message(id, input);
    },

    ip: function (args, request) {
        return request.ip;
    },

    user: ({id}) => {
        return fakeDatabase[id];
    }
};

const app = express()
app.use(loggingMiddleware);
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000);
console.log('Running a GraphQL API server at http://localhost:3000/graphql');

