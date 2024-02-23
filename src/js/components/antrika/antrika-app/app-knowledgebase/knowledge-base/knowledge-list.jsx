
import React from 'react';
import { List } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useFetch, useLocalFilter } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';

import style from './knowledge.scss';

function KnowledgeList() {
	const [localFilter, setLocalFilter] = useLocalFilter('local-filter');
	const request = useFetch({
		request: api.knowledgeBase.knowledge.getAll
	});

	if (request.loading) {
		return <Spinner show={true} />;
	}
	function selectedKnowledge(item) {
		setLocalFilter({
			...localFilter,
			knowledgeBase: item
		});
	}
	return (
		<div className={classNames(style['knowledge-body'])}>
			<List
				itemLayout='horizontal'
				dataSource={request && request.data && request.data.data || []}
				renderItem={item => (
					<Link to={item.slug} onClick={() => selectedKnowledge(item)}>
						<List.Item>
							<List.Item.Meta
								title={<span style={{ fontSize: '15px' }}>{item.title}</span>}
							// actions={[<a key='list-loadmore-edit'>edit</a>]}
							/>
						</List.Item>
					</Link>
				)}
			/>
		</div>
	);
}

export function getArticleCount(catSlug, artSlug) {
	return api.knowledgeBase.article.getCount({
		category_slug: catSlug,
		article_slug: artSlug
	});
}

export default KnowledgeList;
