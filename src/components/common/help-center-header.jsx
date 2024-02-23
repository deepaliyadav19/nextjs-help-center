import React from 'react';
import { Input } from 'antd';

import style from './helpCenterHeader.module.scss';

const HelpCenterHeader = () => {
	return (
		<div className={style['header-section']}>
			<div className={style['header-child-section']}>
				<section>
					<div className={style['header-top-section']}>
						<div className={style['company-logo']}>
							<img src='https://img.trackwick.com/appsLogo/app1484554795573.png' alt='TrackOlap' />
						</div>
						<div>
							<div className={style['text']}>Go to Antrika</div>
						</div>
					</div>
				</section>
				<section>
					<h1 className={style['advice']}>
					Advice and answers from the Antrika Team
					</h1>
					<div className={style['header-search-section']}>
						<Input.Search placeholder='Search for articles...' />
					</div>
				</section>
			</div>
		</div>
	);
};

export default HelpCenterHeader;
