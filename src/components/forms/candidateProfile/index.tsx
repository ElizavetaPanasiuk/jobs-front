import React, { useEffect, useState } from 'react';
import validator from 'validator';

import { Button, ButtonGroup, Form, Input, Loader } from '../../../ui-kit';
import { ListCreator, ImageMessage } from '../..';

import { LoadingStatuses } from '../../../typing/enums';
import { CommonTypes } from '../../../typing/types';

import { useValidateForm } from '../../../hooks';
import { ProfileService } from '../../../service';

const SOFT_SKILLS: string[] = [
	'Communication',
	'Organization',
	'Problem Solving',
	'Time Management',
	'Team Work',
	'Leadership',
	'Attention to Detail',
	'Multitasking',
	'Open to Feedback',
	'Adaptability',
];

const createSoftSkillsArray = (
	skills: string[]
): CommonTypes.ButtonGroupItem[] => {
	const MAX_SKILL_LENGTH = 56;
	let skillsArray: CommonTypes.ButtonGroupItem[] = [];

	skills.forEach((el, id): void => {
		if (el.length <= MAX_SKILL_LENGTH) {
			skillsArray = [
				...skillsArray,
				{
					id: id + 1,
					name: el,
					selected: false,
				},
			];
		}
	});

	return skillsArray;
};

const VALIDATION_RULES: {
	[key: string]: [(value: string) => boolean, string][];
} = {
	firstName: [[(s: string) => s.length > 0, 'The field is required']],
	lastName: [[(s: string) => s.length > 0, 'The field is required']],
	phone: [
		[(s: string) => !s.length || validator.isMobilePhone(s), 'Invalid phone'],
	],
};

const CandidateProfile = () => {
	const [firstName, setFirstName] = useState<string>('');
	const [lastName, setLastName] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [skills, setSkills] = useState<Array<string>>([]);
	const [softSkills, setSoftskills] = useState<
		Array<CommonTypes.ButtonGroupItem>
	>(createSoftSkillsArray(SOFT_SKILLS));
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
			skills,
			softSkills: softSkills.filter((el) => el.selected).map((el) => el.name),
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
			setSkills(profileData.skills ? profileData.skills : []);
			if (profileData.softSkills) {
				setSoftskills(
					softSkills.map((el) =>
						profileData.softSkills.includes(el.name)
							? { ...el, selected: true }
							: el
					)
				);
			}
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
					<h3>Professional Info</h3>
					<ListCreator
						list={skills}
						setList={setSkills}
						label="What skills do you have? Add up to 10."
						placeholder="Type skill"
						maxSize={10}
						maxLength={56}
						disabled={saveLoading}
					/>
					<ButtonGroup
						valuesList={softSkills}
						setValuesList={setSoftskills}
						label="What are your top soft skills? Choose up to 5."
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

export default CandidateProfile;
