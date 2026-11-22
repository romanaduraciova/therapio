'use client';

import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel
} from '@/components/ui/field';
import type { ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

type FormFieldProps = {
	name: string;
	label: string;
	description?: string;
	children: ReactNode;
};

export const FormField = ({
	name,
	label,
	description,
	children
}: FormFieldProps) => {
	const { getFieldState, formState } = useFormContext();
	const { error } = getFieldState(name, formState);

	return (
		<Field data-invalid={!!error}>
			<FieldLabel htmlFor={name}>{label}</FieldLabel>
			{children}
			{description && <FieldDescription>{description}</FieldDescription>}
			<FieldError errors={[error]} />
		</Field>
	);
};
