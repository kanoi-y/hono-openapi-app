import { swaggerUI } from "@hono/swagger-ui";
import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ErrorSchema, ParamsSchema, TodoSchema } from "./schema";

const app = new OpenAPIHono();

const route = createRoute({
  method: "get",
  path: "/todos/{id}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: TodoSchema,
        },
      },
      description: "Retrieve the todo",
    },
    400: {
      content: {
        "application/json": {
          schema: ErrorSchema,
        },
      },
      description: "Returns an error",
    },
  },
});

app.openapi(
  route,
  (c) => {
    const { id } = c.req.valid("param");
    return c.json({
      id,
      text: "Buy milk",
      done: false,
    });
  },
  (result, c) => {
    if (!result.success) {
      return c.json(
        {
          code: 400,
          message: "Validation Error",
        },
        400
      );
    }
  }
);

app.doc("/doc", {
  openapi: "3.0.0",
  info: {
    version: "1.0.0",
    title: "My API",
  },
});

app.get("/ui", swaggerUI({ url: "/doc" }));

export default app;
