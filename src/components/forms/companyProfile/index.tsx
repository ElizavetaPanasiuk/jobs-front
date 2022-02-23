import React, { useEffect, useState } from 'react';
import validator from 'validator';

import { Button, Form, Input, Loader, Textarea } from '../../../ui-kit';
import { ImageMessage } from '../..';

import { LoadingStatuses } from '../../../typing/enums';

import { useValidateForm } from '../../../hooks';
import { ProfileService } from '../../../service';

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	companyName: [[(s: string) => s.length > 0, 'The field is required']],
	logoUrl: [[(s: string) => !s.length || validator.isURL(s), 'Invalid url']],
	phone: [
		[(s: string) => !s.length || validator.isMobilePhone(s), 'Invalid phone'],
	],
};

const CompanyProfile = () => {
	const [companyName, setCompanyName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [logoUrl, setLogoUrl] = useState<string>('');
	const [loading, setLoading] = useState<LoadingStatuses>(
		LoadingStatuses.loading
	);
	const [saveLoading, setSaveLoading] = useState<boolean>(false);
	const { isFormValid, formValidation } = useValidateForm(VALIDATION_RULES, [
		{
			state: companyName,
			name: 'companyName',
		},
		{
			state: logoUrl,
			name: 'logoUrl',
		},
		{
			state: phone,
			name: 'phone',
		},
	]);

	const handleSave = async () => {
		setSaveLoading(true);
		await ProfileService.update({
			companyName,
			description,
			phone,
			logoUrl,
		});
		setSaveLoading(false);
	};

	const getProfileData = async () => {
		const profileData = await ProfileService.get();
		if (!profileData) {
			setLoading(LoadingStatuses.error);
		} else {
			setCompanyName(profileData.companyName);
			setDescription(profileData.description);
			setPhone(profileData.phone);
			setLogoUrl(profileData.logoUrl);
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
						value={companyName}
						onChange={setCompanyName}
						placeholder="Google"
						maxLength={255}
						label="Company Name*"
						disabled={saveLoading}
						isValid={formValidation.companyName?.isValid}
						validationMessage={formValidation.companyName?.validationMessage}
					/>
					<Input
						value={logoUrl}
						onChange={setLogoUrl}
						placeholder="url"
						maxLength={255}
						label="Logo Url"
						disabled={saveLoading}
						isValid={formValidation.logoUrl?.isValid}
						validationMessage={formValidation.logoUrl?.validationMessage}
					/>
					<Input
						value={phone}
						onChange={setPhone}
						placeholder="Phone"
						maxLength={20}
						label="Phone Number"
						disabled={saveLoading}
						isValid={formValidation.phone?.isValid}
						validationMessage={formValidation.phone?.validationMessage}
					/>
					<Textarea
						value={description}
						onChange={setDescription}
						maxLength={1000}
						label="Company description"
						disabled={saveLoading}
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

export default CompanyProfile;
