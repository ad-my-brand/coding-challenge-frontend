import { rest } from "msw";
import { users } from "../__mocks__/mocks";

const handlers = [
  rest.get("https://jsonplaceholder.typicode.com/users", (_req, res, ctx) => {
    return res(ctx.json(users));
  }),
];

export { handlers };
