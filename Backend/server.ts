import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import cors from 'cors';
import schema from './Schemas/UserType';
import userData from './MOCK_DATA.json';

const app = express();
app.use(cors());
app.use(express.json());
const port = 9999;

const root = {
    message: () => 'testing from server....!',
    users: () => userData, // Resolver function to fetch all users
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/graphql`);
});