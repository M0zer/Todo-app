import type { Task } from "../models/task";

const TodoItem = ({
  task,
  index,
  toggleCompleted,
}: {
  task: Task;
  index: number;
  toggleCompleted: (index: number) => void;
}) => {
  return (
    <>
      <li>
        <label>
          <p>{task.text}</p>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleCompleted(index)}
          />
        </label>
      </li>
    </>
  );
};

export default TodoItem;
