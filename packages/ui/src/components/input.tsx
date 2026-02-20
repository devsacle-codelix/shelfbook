interface InputProps {
	type: string;
	placeholder: string;
	label: string;
	id: string;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = ({
	type,
	placeholder,
	label,
	id,
	onChange,
}: InputProps) => {
	return (
		<div>
			<label htmlFor={id} className="text-md font-medium text-zinc-700 ml-1">
				{label}
			</label>
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={onChange}
				className="border border-zinc-200 shadow shadow-zinc-100 p-2 w-full rounded-lg"
			/>
		</div>
	);
};
