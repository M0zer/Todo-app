const TodoCounter = ({ todo, done }: { todo: number; done: number }) => {
  return (
    <div style={{ display: "flex", gap: "16px" }}>
      <p>Todo: {todo}</p>
      <p>Done: {done}</p>
    </div>
  );
};

export default TodoCounter;
