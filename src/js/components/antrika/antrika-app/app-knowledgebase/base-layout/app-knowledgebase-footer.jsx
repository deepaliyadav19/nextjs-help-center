
import React from 'react';

import packageInfo from '../../../../../../../package.json';
import TooltipHelp from '../../../../common/tooltip-help';

import style from './app-knowledgebase-footer.scss';

function AppKnowledgebaseFooter() {

	return (
		<div className={style.footer}>
			<TooltipHelp helpText={ 'version - ' + (packageInfo?.version || 'NA')} position='top'>
				<a className={style.version} href='https://trackolap.com'>Powered by Antrika</a>
			</TooltipHelp>
		</div>
	);
}

export default AppKnowledgebaseFooter;
