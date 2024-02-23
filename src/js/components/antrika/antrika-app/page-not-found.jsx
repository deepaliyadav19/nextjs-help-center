import React from 'react';
import Icon from '@ant-design/icons';
import Button from 'antd/es/button';

import { NotFoundIcon } from '../../../../icons/';
import { useCurrentUser } from '../../../hooks';

import style from './page-not-found.scss';

function PageNotFound() {
	const user = useCurrentUser()[0];

	return (
		<div className={style['page-not-found']}>
			<Icon component={NotFoundIcon} className={style['title-icon']} />
			<div>
				<p className={style['title']}>Oops! The screen you are trying to explore does not exists.</p>
				{user?.companyName && <p className={style['txt']}>As the requested url was not found in the server. Please recheck the url once or start exploring other screens in &quot;{user?.companyName}&quot; feedback portal</p>}
			</div>
			<Button className={style['home-btn']} onClick={() => window.location.reload()}>Reload</Button>
		</div>
	);
}

export default PageNotFound;
