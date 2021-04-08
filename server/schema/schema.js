const graphql = require('graphql');
const _ = require('lodash')

const {GraphQLObjectType,GraphQLString,GraphQLSchema} = graphql;

const anime = [
    {
        name:"Naruto",
    genre:"Action",
    id:"1"},
    {name:"One Piece",genre:"Adventure",id:"2"},
    {name:"Death Note",genre:"Puzzle",id:"3"},
]

const AnimeType = new GraphQLObjectType({
    name: "Anime",
    fields: ()=>({
        id:{type: GraphQLString},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        anime:{
            type: AnimeType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //code to query data from database
                return _.find(anime,{id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})