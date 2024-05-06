import { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLList, GraphQLNonNull } from 'graphql';
import fs from 'fs';
import path from 'path';

// Load user data from data.json file
const userDataPath = path.resolve(__dirname, '../MOCK_DATA.json');
const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLInt },
        first_name: { type: new GraphQLNonNull(GraphQLString)},
        last_name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString },
        ip_address: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLInt } },
            resolve(parent, args) {
                // Logic to fetch user data based on id
                return userData.find((user: { id: any; })  => user.id === args.id);
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return userData;
            }
        }
    }
});

export default new GraphQLSchema({
    query: RootQuery
});