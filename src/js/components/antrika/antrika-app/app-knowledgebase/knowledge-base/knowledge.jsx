
import React from 'react';
import classNames from 'classnames';

import { useFetch } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';
import AppKnowledgebaseHeader from '../base-layout/app-knowledgebase-header';

import style from './knowledge.scss';
import KnowledgeTopSearched from './knowledge-top-searched';
import KnowledgeSection from './knowledge-section';

const filterKey = 'knowledge-filter';

function Knowledge({ history, match }) {
	const request = useFetch({
		request: api.knowledgeBase.category.getAll,
		payload: {
			knowledge_base_slug: match.params.kslug
		}
	});

	if (request.loading) {
		return <Spinner show={true} />;
	}

	return (
		<div style={{ height: '100%' }}>
			<AppKnowledgebaseHeader match={match} history={history} title={request && request.data && request.data.d} />
			<div className={style['outer']}>
				<div className={classNames(style['knowledge-body'])}>
					<KnowledgeTopSearched filterKey={filterKey} history={history} match={match} />
					<div className={style.categorySection}>
						<div className={style.heading}>Collections</div>
						<div className={style.subHeading}>Explore Articles Collection Wise</div>
					</div>
					<KnowledgeSection filterKey={filterKey} history={history} categories={request && request.data && request.data.data || []} />
				</div>
			</div>
		</div>
	);
}

export default Knowledge;
