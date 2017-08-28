var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var express = require('express');
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var data = require('./data');

var GraphQLSchema = graphql.GraphQLSchema;
var GraphQLObjectType = graphql.GraphQLObjectType;
var GraphQLString = graphql.GraphQLString;
var GraphQLInt = graphql.GraphQLInt;

var goldbergType = new GraphQLObjectType({
  name: "Goldberg",
  description: "Member of The Goldbergs",
  fields: {
   character: {
     type: GraphQLString,
     description: "Name of the character",
   },
   actor: {
     type: GraphQLString,
     description: "Actor playing the character",
   },
   role: {
     type: GraphQLString,
     description: "Family role"
   },
   traits: {
     type: GraphQLString,
     description: "Traits this Goldberg is known for"
   },
   id: {
     type: GraphQLInt,
     description: "ID of this Goldberg"
   }
 }
});

var queryType = new GraphQLObjectType({
  name: "query",
  description: "Goldberg query",
  fields: {
    goldberg: {
      type: goldbergType,
      args: {
        id: {
          type: GraphQLInt
        }
      },
      resolve: function(_, args){
        return getGoldberg(args.id)
      }
    }
  }
});

function getGoldberg(id) {
 return data[id]
}

var schema = new GraphQLSchema({
 query: queryType
});

var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(8080);
console.log("The GraphQL Server is running.")

var compiler = webpack({
  entry: "./index.js",
  output: {
    path: __dirname,
    filename: "bundle.js",
    publicPath: "/static/"
  },
  module: {
    loaders: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }
    ]
  }
});

var app = new WebpackDevServer(compiler, {
 contentBase: "/public/",
 proxy: {"/graphql": `http://localhost:${8080}`},
 publicPath: "/static/",
 stats: {colors: true}
});
app.use("/", express.static("static"));
app.listen(3000);
console.log("The App Server is running.")
