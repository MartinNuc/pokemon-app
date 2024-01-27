module.exports = {
  client: {
    includes: ['./app/**/*.{ts,tsx}'],
    service: {
      name: "pokemon-graphql-app",
      url: "http://localhost:4000/graphql"
    }
  }
};