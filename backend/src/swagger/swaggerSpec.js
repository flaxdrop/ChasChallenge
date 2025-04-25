const swaggerSpec = {
    openapi: "3.0.0",
    info: {
      title: "AirAware API",
      version: "1.0.0",
      description: "API för AirAware luftkvalitet",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Lokal utvecklingsserver",
      },
    ],
    paths: {
      "/measurements": {
        get: {
          summary: "Hämta alla mätningar",
          responses: {
            200: {
              description: "En lista med mätningar",
              content: {
                "application/json": {
                  schema: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "integer" },
                        timestamp: { type: "string", format: "date-time" },
                        temperature: { type: "number" },
                        humidity: { type: "number" },
                        pressure: { type: "number" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  
  export default swaggerSpec;
  