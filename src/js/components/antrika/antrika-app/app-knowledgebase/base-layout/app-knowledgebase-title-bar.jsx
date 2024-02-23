import React from 'react';
import PropTypes from 'prop-types';

import { useGridFilters } from '../../../../../hooks';
import { getArticleCount } from '../knowledge-base/knowledge-list';
import { api } from '../../../../../api';
import ApiSearchBox from '../api-search-box/api-search-box';

import style from './app-knowledgebase-title-bar.scss';

function AppKnowledgebaseTitleBar({ title, config, filterKey, match, history, styling, customStyle = {}, request, placeholder }) {

	const [filters] = useGridFilters(filterKey);

	let param = {
		load_all: true,
		knowledge_base_slug: match.params.kslug,
		q: ''
	};

	let onSuccess = slug => {
		if (!request) {
			getArticleCount(match.params.kslug, slug.slug);
		}
		return history.push('/' + match.params.kslug + '/' + slug.categorySlug + '/' + slug.slug);
	};

	return (
		// <div className={style['main-container']}>
		// <div className={style.titleBar}>
		<>
			<h1 className={style.title}>{title}</h1>
			<div className={style['horizontal-flow']} style={customStyle ? { ...customStyle, width: '100%' } : { width: '100%', marginRight: '9%' }}>
				{
					config.search && !filters.hideSearch &&
					<div className={style['input-search']} style={styling}>
						<ApiSearchBox
							placeholder={placeholder || 'Search Articles'}
							request={request || api.knowledgeBase.article.getAll}
							param={param}
							match={match}
							onSuccess={onSuccess}
							searchStyle={{ width: 540 }} />
					</div>
				}
				{/* Extra Child Components */}
				{config.children}
			</div>
		</>
		// </div>
		// </div>
	);
}

AppKnowledgebaseTitleBar.propTypes = {
	filterKey: PropTypes.string.isRequired,
	config: PropTypes.object.isRequired,
	title: PropTypes.string,
	match: PropTypes.object,
	history: PropTypes.object,
	styling: PropTypes.object,
	customStyle: PropTypes.object,
	request: PropTypes.func,
	placeholder: PropTypes.string
};

export default AppKnowledgebaseTitleBar;
