import { useState, useEffect } from 'react';

const useValidateForm = (
	validationRules: {
		[key: string]: [(value: string) => boolean, string][];
	},
	validatedValues: {
		state: string;
		name: string;
	}[]
) => {
	const [isFormValid, setFormValid] = useState<boolean>(false);
	const [formValidation, setFormValidation] = useState<{
		[key: string]: { isValid: boolean; validationMessage: string };
	}>({});

	const validateForm = (): {
		[key: string]: { isValid: boolean; validationMessage: string };
	} => {
		const formValidation = Object.fromEntries(
			validatedValues.map((value) => {
				const isNewValueValid = validationRules[value.name].every((rule) =>
					rule[0](value.state)
				);

				return [
					value.name,
					{
						isValid: isNewValueValid,
						validationMessage: !isNewValueValid
							? validationRules[value.name].find(
									(rule) => !rule[0](value.state)
							  )[1]
							: '',
					},
				];
			})
		);

		return formValidation;
	};

	useEffect(
		() => {
			const newValidation = validateForm();
			setFormValidation(newValidation);
			setFormValid(Object.entries(newValidation).every((el) => el[1].isValid));
		},
		validatedValues.map((el) => el.state)
	);

	return { isFormValid, formValidation };
};

export default useValidateForm;
