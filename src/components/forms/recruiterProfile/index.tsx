import React, { useEffect, useState } from 'react';
import validator from 'validator';

import { Button, Form, Input, Loader } from '../../../ui-kit';
import { ImageMessage } from '../..';

import { LoadingStatuses } from '../../../typing/enums';

import { useValidateForm } from '../../../hooks';
import { ProfileService } from '../../../service';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	firstName: [[(s: string) => s.length > 0, 'The field is required']],
	lastName: [[(s: string) => s.length > 0, 'The field is required']],
	phone: [
		[(s: string) => !s.length || validator.isMobilePhone(s), 'Invalid phone'],
	],
};

const RecruiterProfile = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [loading, setLoading] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);
	const [saveLoading, setSaveLoading] = useState<boolean>(false);
	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: firstName,
			name: 'firstName',
		},
		{
			state: lastName,
			name: 'lastName',
		},
		{
			state: phone,
			name: 'phone',
		},
	]);

	const handleSave = async () => {
		setSaveLoading(true);
		await ProfileService.update({
			firstName,
			lastName,
			phone,
		});
		setSaveLoading(false);
	};

	const getProfileData = async () => {
		const profileData = await ProfileService.get();
		if (!profileData) {
			setLoading(LoadingStatuses.error);
		} else {
			setFirstName(profileData.firstName);
			setLastName(profileData.lastName);
			setPhone(profileData.phone);
			setLoading(LoadingStatuses.success);
		}
	};

	useEffect(() => {
		getProfileData();
	}, []);

	return (
		<Form>
			{loading === LoadingStatuses.loading ? (
				<Loader />
			) : loading === LoadingStatuses.error ? (
				<ImageMessage type="error" />
			) : (
				<>
					<h3>Basic Info</h3>
					<Input
						value={firstName}
						onChange={setFirstName}
						placeholder="John"
						maxLength={56}
						label="First Name*"
						disabled={saveLoading}
						isValid={formValidation.firstName?.isValid}
						validationMessage={formValidation.firstName?.validationMessage}
					/>
					<Input
						value={lastName}
						onChange={setLastName}
						placeholder="Smith"
						maxLength={56}
						label="Last Name*"
						disabled={saveLoading}
						isValid={formValidation.lastName?.isValid}
						validationMessage={formValidation.lastName?.validationMessage}
					/>
					<Input
						value={phone}
						onChange={setPhone}
						placeholder="xxx xxx xxxx"
						maxLength={20}
						label="Phone Number"
						disabled={saveLoading}
						isValid={formValidation.phone?.isValid}
						validationMessage={formValidation.phone?.validationMessage}
					/>
					<Button
						title="Save"
						onClick={handleSave}
						disabled={!isFormValid || saveLoading}
					/>
				</>
			)}
		</Form>
	);
};

export default RecruiterProfile;
