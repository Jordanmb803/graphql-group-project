const { GraphQLServer } = require('graphql-yoga');

const typeDefs = `
type Query {
    characters: [Character!]!
}

type Mutation {
    addCharacter(name: String!, picture: String!): Character!
    removeCharacter(index: Int!): String!
    updateCharacter(index: Int!, picture: String! ) : Character!
}

type Character {
    id: ID!
    name: String!
    picture: String!
}
`

let characters = [{
    id: 0,
    name: 'Michael Scott',
    picture: 'https://upload.wikimedia.org/wikipedia/en/d/dc/MichaelScott.png'

},
{
    id: 1,
    name: 'Jim Halpert',
    picture: 'https://nypdecider.files.wordpress.com/2017/11/jim-halpert.jpg?quality=90&strip=all&w=646&h=431&crop=1'
}]
let idCount = characters.length - 1

const resolvers = {
    Query: {
        characters: () => characters,

    },
    Mutation: {
        addCharacter: (root, args) => {
            const character = {
                id: idCount++,
                name: args.name,
                picture: args.picture
            }
            characters.push(character)
            return character
        },
        removeCharacter: (root, args) => {
            characters.splice(args.index, 1)
            return 'Character Deleted'
        },
        updateCharacter: (root, args) => {
            characters[args.index].picture = args.picture
            return characters[args.index]

        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))