const UserTabButton = ({
	label,
	ariaLabel,
	className,
	onClick,
}: {
	label: string;
	ariaLabel: string;
	className?: string;
	onClick: () => void;
}) => {
	return (
		<button aria-label={ariaLabel} className={className} onClick={onClick}>
			{label}
		</button>
	);
};

export default UserTabButton;
