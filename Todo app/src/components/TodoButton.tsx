const TodoButton = ({
	setModalOpen,
}: {
	setModalOpen: (setModalOpen: boolean) => void;
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
