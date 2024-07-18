import { HttpResponse, StrictRequest } from "msw";
import { Todo } from "../../../src/models/Todo";
import { db } from "../../db";

export const postTodo = async ({
  request,
}: {
  request: StrictRequest<{ title: string }>;
}) => {
  const { title } = await request.json();

  if (!title) {
    return HttpResponse.json(
      { message: "Title is required" },
      {
        status: 401,
      },
    );
  }

  const todo: Todo = {
    id: Date.now(),
    title,
    status: "active",
  };

  db.insertLog({
    id: Date.now(),
    createdAt: new Date().toISOString(),
    type: "CREATE",
    message: `Created todo with id ${todo.id}`,
  });
  db.insertTodo(todo);
  return HttpResponse.json(todo, {
    status: 201,
  });
};
