import { createRoute, OpenAPIHono } from "@hono/zod-openapi";
import { ParamsSchema, TodoSchema } from "./schema";
import { swaggerUI } from '@hono/swagger-ui'

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
  },
});

app.openapi(route, (c) => {
  const { id } = c.req.valid("param");
  return c.json({
    id,
    text: "Buy milk",
    done: false,
  });
});

app.doc('/doc', {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'My API',
  },
})

app.get('/ui', swaggerUI({ url: '/doc' }))

export default app;
