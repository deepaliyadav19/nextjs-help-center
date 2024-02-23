
import React from 'react';
import MenuContext from 'antd/es/menu/MenuContext';
import { Link } from 'react-router-dom';

// import Store from '../../global/store';
import TrackolapLogo from '../../../../../../img/favicon.png';

import style from './app-knowledgebase-header.scss';
import AppKnowledgebaseTitleBar from './app-knowledgebase-title-bar';

function AppKnowledgebaseHeader({ match, history, filterKey, title }) {

	return (
		<MenuContext.Provider >
			<header className={style.navbar}>
				<div className={style['header-left-content']}>
					<Brand match={match} title={title} />
				</div>
				<RightContent match={match} history={history} filterKey={filterKey} />
			</header>
		</MenuContext.Provider>
	);
}

function Brand({ match, title }) {
	return (
		<div className={style.brand} >
			<Link to={'/' + match.params.kslug} className={style['link']}>
				<img className={style.logo} src={TrackolapLogo} alt='Antrika' />
			</Link>
			<div className={style['link-title']}>
				<div className={style.heading}> Help Center</div>
				<Link to={'/' + match.params.kslug} title={title}>
					<span className={style.title}>{title}</span>
				</Link>
			</div>
		</div>
	);
}

function RightContent({ match, history, filterKey }) {
	return (
		// <div className={style['right-content']}>
		<AppKnowledgebaseTitleBar history={history} match={match} filterKey={filterKey}
			// styling={{ marginTop: '60px' }}
			config={{
				search: true,
				children: null
			}} />
		// </div >
	);
}

export default AppKnowledgebaseHeader;
