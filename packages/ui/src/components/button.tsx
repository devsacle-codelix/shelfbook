interface ButtonProps {
	label: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
	type?: "button" | "submit" | "reset";
}

export const Button = ({ label, onClick, disabled, type }: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className="bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-lg w-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
		>
			{label}
		</button>
	);
};
