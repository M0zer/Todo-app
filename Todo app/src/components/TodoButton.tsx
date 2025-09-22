const TodoButton = ({
  setModalOpen,
}: {
  setModalOpen: (arg0: boolean) => void;
}) => {
  return (
    <>
      <button title="Hozzáadás" onClick={() => setModalOpen(true)}>
        Feladat hozzáadása
      </button>
    </>
  );
};

export default TodoButton;
