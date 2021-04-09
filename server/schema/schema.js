/* eslint-disable no-unused-vars */
const graphql = require("graphql");
const _ = require("lodash");
const Anime = require("../models/anime");
const Writer = require("../models/writer");
// const { MongoClient } = require("mongodb");
const ANIME = require("../data/anime.json");
const WRITER = require("../data/writer.json");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// const user = process.env.USER;
// const password = process.env.PASSWORD;
// const uri = `mongodb+srv://${user}:${password}@cluster0.f8vgz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const saveDB = (data) => {
//   client.connect(async (err) => {
//     const collection = client.db("test").collection("writers");
//     // perform actions on the collection object
//     console.log("connection done");
//     await collection.insertOne(data, (err, result) => {
//       if (err) console.log(err);
//       console.log("data saved ", result.insertedId);
//       return result.insertedId;
//     });
//   });
// };

// const readDB = (data) => {
//   client.connect(async (err) => {
//     const collection = client.db("test").collection("writers");
//     console.log("connection done to readDB");
//     const res = await collection.find({});
//     console.log(res);
//   });
// };
// readDB();
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
} = graphql;

const AnimeType = new GraphQLObjectType({
  name: "Anime",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    writer: {
      // eslint-disable-next-line no-use-before-define
      type: WriterType,
      resolve(parent, args) {
        return _.find(WRITER, { _id: parent.writerId });
        // return writer.findById(parent.writerId);
      },
    },
  }),
});

const WriterType = new GraphQLObjectType({
  name: "Writer",
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
    anime: {
      type: new GraphQLList(AnimeType),
      resolve(parent, args) {
        return _.filter(ANIME, { writerId: parent.id });
        // return Anime.findById({ writerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    anime: {
      type: AnimeType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to query data from database
        return _.find(ANIME, { id: args.id });
        // return Anime.findById(args.id);
      },
    },
    writer: {
      type: WriterType,
      args: { _id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(WRITER, { id: args.id });
        // return Writer.findById(args.id);
      },
    },
    animes: {
      type: new GraphQLList(AnimeType),
      resolve(parent, args) {
        // code to query data from database
        return ANIME;
        // return Anime.findById(args.id);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addWriter: {
      type: WriterType,
      args: {
        name: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const writer = new Writer({
          name: args.name,
        });
        let data = [WRITER]
        data.push(writer)
        console.log(data)
        fs.writeFileSync(
          path.join(__dirname, `../data/writer.json`),
          JSON.stringify(data)
        );

        // const id = await saveDB(writer);
        // const result = await readDB({ id });
        return writer;
      },
    },
    addAnime: {
      type: AnimeType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        writerId: { type: GraphQLString },
      },
      async resolve(parent, args) {
        const anime = new Anime({
          name: args.name,
          genre: args.genre,
          writerId: args.writerId,
        });
        let data = ANIME
        data.push(anime)
        console.log(data)
        fs.writeFileSync(
          path.join(__dirname, `../data/anime.json`),
          JSON.stringify(data)
        );
        // const id = await saveDB(writer);
        // const result = await readDB({ id });
        return anime;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
