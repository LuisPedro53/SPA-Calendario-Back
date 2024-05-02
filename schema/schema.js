const {
  GraphQLSchema,
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLInt,
} = require("graphql");
const { GraphQLDate, GraphQLTime } = require("graphql-iso-date");

const {
  getTarefas,
  createTarefa,
  updateTarefa,
  deleteTarefa,
} = require("../Models/tarefa");

const TarefaType = new GraphQLObjectType({
  name: "Tarefa",
  fields: () => ({
    cdTarefa: { type: GraphQLString },
    nmTitulo: { type: GraphQLString },
    nmDescricao: { type: GraphQLString },
    dtTarefa: { type: GraphQLDate },
    horaTarefa: { type: GraphQLString },
    tempoTarefa: { type: GraphQLInt },
  }),
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    tarefas: {
      type: new GraphQLList(TarefaType),
      args: {
        cdTarefa: { type: GraphQLString },
        nmTitulo: { type: GraphQLString },
      },
      resolve(parent, args) {
        return getTarefas(args);
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createTarefa: {
      type: TarefaType,
      args: {
        nmTitulo: { type: new GraphQLNonNull(GraphQLString) },
        nmDescricao: { type: new GraphQLNonNull(GraphQLString) },
        dtTarefa: { type: new GraphQLNonNull(GraphQLDate) },
        horaTarefa: { type: new GraphQLNonNull(GraphQLTime) },
        tempoTarefa: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        return createTarefa(args);
      },
    },
    updateTarefa: {
      type: TarefaType,
      args: {
        cdTarefa: { type: new GraphQLNonNull(GraphQLString) },
        nmTitulo: { type: GraphQLString },
        nmDescricao: { type: GraphQLString },
        dtTarefa: { type: GraphQLDate },
        horaTarefa: { type: GraphQLTime },
        tempoTarefa: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return updateTarefa(args.cdTarefa, args);
      },
    },
    deleteTarefa: {
      type: GraphQLBoolean,
      args: {
        cdTarefa: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return deleteTarefa(args.cdTarefa);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
});
