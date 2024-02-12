import { z } from "@hono/zod-openapi";

export const ParamsSchema = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '1212121',
    }),
})

export const ErrorSchema = z.object({
  code: z.number().openapi({
    example: 400,
  }),
  message: z.string().openapi({
    example: 'Bad Request',
  }),
})

export const TodoSchema = z
  .object({
    id: z.string().openapi({
      example: "123",
    }),
    text: z.string().openapi({
      example: "Buy milk",
    }),
    done: z.boolean().openapi({
      example: false,
    }),
  })
  .openapi("Todo");
