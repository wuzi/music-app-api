/*
  |--------------------------------------------------------------------------
  | Swagger Information
  | Please use Swagger 2 Spesification Docs
  | https://swagger.io/docs/specification/2-0/basic-structure/
  |--------------------------------------------------------------------------
  */
export default {
  swaggerDefinition: {
    info: {
      title: 'Music APP API',
      version: '0.1.0',
    },

    basePath: '/v1',

    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
      },
    },
  },

  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },

  apis: [
    'docs/**/*.yml',
  ],
};
