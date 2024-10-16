import { Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi, { SwaggerOptions } from "swagger-ui-express";

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Mi API",
      version: "1.0.0",
      description: "Documentación API RESTful",
      contact: {
        name: "Soporte API",
        url: "https://www.instagram.com/augusto0414/",
      },
    },
  },
  apis: ["./src/routes/*.ts"],
};

export const swaggerSetup = () => {
  return swaggerJSDoc(swaggerOptions);
};

export const SwaggerDoc = (app: Application) => {
  const swaggerSpec = swaggerSetup();
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
};
