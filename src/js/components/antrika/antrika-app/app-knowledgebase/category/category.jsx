
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Switch, Route } from 'react-router-dom';
import { Breadcrumb } from 'antd';

import { useFetch } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';
import AppKnowledgebaseHeader from '../base-layout/app-knowledgebase-header';
import { isNotEmptyArray } from '../../../../../utils/type-util';
import KnowledgebaseSidebarLayout from '../base-layout/sidebar/knowledgebase-sidebar-layout';

import style from './category.scss';
import CategoryArticles from './category-articles';
import CategoryArticleDetail from './category-article-detail';

const filterKey = 'knowledge-filter';

function Category({ history, match }) {
	const [sidemenus, setSidemenus] = useState([]);
	const [selectedMenuList, setSelectedMenuList] = useState([]);

	let sidebarMenu = [];

	let keys = history.location?.pathname.split('/').filter(x => x);

	const request = useFetch({
		// request: api.callGetWithMockandAPI,
		// payload: {
		// 	url: 'https://run.mocky.io/v3/f6d89ac5-7c05-44ae-9046-32b7d70b5e12'
		// }
		request: api.knowledgeBase.category.getAll,
		payload: {
			knowledge_base_slug: match.params.kslug
		}
	});

	// useEffect(() => {
	// 	if (request && request.data && request.data.data) {
	// 		request.data.data.forEach(category => {
	// 			sidebarMenu.push({
	// 				key: category.slug,
	// 				klSlug: category.knowledgebaseSlug,
	// 				value: category.title,
	// 				data: category.data

	// 			});
	// 		});
	// 		setSidemenus(sidebarMenu);
	// 	}
	// }, [request && request.data && request.data.data]);

	useEffect(() => {
		if (request && request.data && request.data.data) {
			request.data.data.forEach(category => {
				sidebarMenu.push({
					key: category.slug,
					klSlug: category.knowledgebaseSlug,
					value: category.title,
					data: category.data

				});
				if (category.slug === keys[1]) {
					if (keys.length === 3 && isNotEmptyArray(category.data)) {
						category.data.forEach(sel => {
							if (sel.slug === keys[2]) {
								let data = [{ title: <a href={`/${ category.knowledgebaseSlug }`}>{request.data?.d || 'Home'}</a> },
									{ title: <a href={`/${ category.knowledgebaseSlug }/${ category.slug }`}>{category.title}</a> },
									{ title:  sel.title }
								];
								setSelectedMenuList(data);
							}
						});
					} else {
						let data = [{ title: <a href={`/${ category.knowledgebaseSlug }`}>{request.data?.d || 'Home'}</a> },
						 { title: category.title }];
						setSelectedMenuList(data);
					}
				}
			});
			setSidemenus(sidebarMenu);
		}
	},[history.location?.pathname, request.data?.data]);

	if (request.loading) {
		return <Spinner show={true} />;
	}

	return (
		<div style={{ height: '100%' }}>
			<AppKnowledgebaseHeader match={match} history={history} title={request.data?.d} customStyle={{ marginRight: '14%' }} />
			<div className={style['outer']}>
				<div style={{ background: '#F1F3F8', borderTop: '1px solid #DDDFE6', minHeight: '100%' }}>
					<div className={classNames(style['category-body'])}>
						<div className={style.menuBar}>
							{/* <div className={style['cat-title']}>Categories</div> */}
							<KnowledgebaseSidebarLayout data={sidemenus} title={'Collections'} history={history} match={match} filterKey={filterKey} />
						</div>
						<div className={style.container}>
							<Breadcrumb separator='>' style={{ margin: '10px 0px 13px', fontSize: '13px' }} items={isNotEmptyArray(selectedMenuList) ? selectedMenuList : []}>
							</Breadcrumb>
							<div className={style['article-container']}>
								<Switch>
									<Route path='/:klsulg/:catslug' exact ><CategoryArticles filterKey={filterKey} history={history} match={match} /></Route>
									<Route path='/:klsulg/:catslug/:artslug' exact ><CategoryArticleDetail filterKey={filterKey} history={history} match={match} /></Route>
								</Switch>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Category;
