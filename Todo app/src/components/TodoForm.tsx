const TodoForm = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Bezárás
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
