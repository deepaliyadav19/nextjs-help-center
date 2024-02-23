import React, { useState, useEffect } from 'react';
import { Form } from 'react-final-form';
import { SearchOutlined } from '@ant-design/icons';

import { isEmptyString, isNonEmptyString } from '../../../../../utils/type-util';
import SelectField from '../../../../common/form/select-field';
import { useFetch } from '../../../../../hooks';

import style from './api-search-box.scss';

export default function ApiSearchBox({ placeholder, match, request, param, onSuccess }) {

	const [options, setOptions] = useState([]);
	const [searchData, setSearchData] = useState('');

	function onSearch(val) {
		val = val.trim();
		if (val.includes("'")) {
			return setSearchData(val.replaceAll("'", ''));
		} else {
			setSearchData(val);
		}
	}

	let handleChange = value => {
		let selectedValue = options.find(v => v.id === value);

		if (selectedValue && selectedValue.slug) {
			onSuccess(selectedValue);
		}
	};

	let onSubmit = () => { };

	return (
		<Form
			onSubmit={onSubmit}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className={style.form}>
					{searchData && isNonEmptyString(searchData) &&
						<ApiCall
							request={request}
							match={match.params?.artslug}
							payload={{ ...param, q: encodeURIComponent(searchData) }}
							setOptions={setOptions}
						/>
					}
					<div className={isEmptyString(searchData) ? style['list-value'] : style['']}>
						<div className={style.searchArea}>
							<SearchOutlined className={style['search-icon']} />
							<SelectField
								showSearch
								allowClear
								size='large'
								name='search'
								// loading={response.loading}
								onChange={handleChange}
								keyField='id'
								textField='title'
								onSearch={onSearch}
								placeholder={placeholder}
								data={options}
								showArrow={false}
							/>
						</div>
					</div>
				</form>
			)}
		/>
	);
}

function ApiCall({ request, payload, setOptions, match }) {

	let response = useFetch({
		request: request,
		payload: { ...payload }
	});

	useEffect(() => {
		if (response.data && response.data.data) {
			let res = response.data.data;
			const newData = res.filter(el => el.id !== match);
			setOptions(newData);
		}
	}, [response.data]);

	return null;
}
