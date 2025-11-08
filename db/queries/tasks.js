import db from "#db/client";

export async function createTask(title, done, userId) {
  let sql = `
  INSERT INTO tasks
    (title, done, user_id)
  VALUES
    ($1, $2, $3)
  RETURNING *
  `;
  let {
    rows: [task],
  } = await db.query(sql, [title, done, userId]);
  return task;
}

export async function getTasksByUserId(userId) {
  let sql = `
  SELECT *
  FROM tasks
  WHERE user_id = $1
  `;
  let { rows: tasks } = await db.query(sql, [userId]);
  return tasks;
}

export async function getTaskById(id) {
  let sql = `
  SELECT *
  FROM tasks
  WHERE id = $1
  `;
  let {
    rows: [task],
  } = await db.query(sql, [id]);
  return task;
}

export async function deleteTaskById(id) {
  let sql = `
  DELETE FROM tasks
  WHERE id = $1
  `;
  await db.query(sql, [id]);
}

export async function updateTaskById(id, title, done) {
  let sql = `
  UPDATE tasks
  SET
    title = $2,
    done = $3
  WHERE id = $1
  RETURNING *
  `;
  let {
    rows: [task],
  } = await db.query(sql, [id, title, done]);
  return task;
}
