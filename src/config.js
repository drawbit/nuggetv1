require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  app: {
    title: 'Nugget - Talent Discovery',
    description: 'Create and launch task-based assessments to find the right candidate fit.',
    head: {
      titleTemplate: 'Nugget: Talent Discovery %s',
      meta: [
        {name: 'description', content: 'Create and launch task-based assessments to find the right candidate fit.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Nugget - Talent Discovery'},
        {property: 'og:image', content: ''},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'Nugget - Talent Discovery'},
        {property: 'og:description', content: 'Create and launch task-based assessments to find the right candidate fit.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: ''},
        {property: 'og:creator', content: 'Ali El-Shayeb'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
