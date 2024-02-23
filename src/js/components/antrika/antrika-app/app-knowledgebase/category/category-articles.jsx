
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@ant-design/icons';
import { List, ConfigProvider, Empty } from 'antd';
import classNames from 'classnames';

import { useContentHeight, useContentWidth, useFetch, useGridFilters } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';
import { AntrikaBackIcon } from '../../../../../../icons/';
import { customHistoryPush } from '../../../../../auth/custom-route';
import TooltipHelp from '../../../../common/tooltip-help';
import IdeaIcon from '../../../../../../icons/idea-icon';
import { isNotEmptyArray } from '../../../../../utils/type-util';

import style from './category.scss';

function CategoryArticles({ match, filterKey, apiUrl, listIcon, titlePath }) {
	const listRef = useRef();
	let contentHeight = useContentHeight();
	let contentWidth = useContentWidth();
	const [filters] = useGridFilters(filterKey);

	const request = useFetch({
		request: apiUrl || api.knowledgeBase.article.getAll,
		payload: {
			load_all: true,
			knowledge_base_slug: match.params.kslug,
			category_slug: match.params.catslug
		},
		dontCall: !match.params.catslug
	});

	// useEffect(() => {
	// 	request.refresh();
	// }, [match.params.catslug]);

	useEffect(() => {
		if (request.data && request.data.data) {
			if (listRef.current) {
				if (contentWidth < 768) {
					listRef.current.querySelector('.ant-spin-container').style.minHeight = (contentHeight - 370) + 'px';
					listRef.current.querySelector('.ant-spin-container').style.height = 'unset';
					listRef.current.querySelector('.ant-spin-container').style.overflowX = 'unset';
				} else {
					listRef.current.querySelector('.ant-spin-container').style.height = (contentHeight - 150) + 'px';
					listRef.current.querySelector('.ant-spin-container').style.minHeight = 'unset';
					listRef.current.querySelector('.ant-spin-container').style.overflowX = 'auto';
				}
			}
		}
		// if (listRef.current) {
		// 	let element = listRef.current.querySelector('.ant-spin-container');

		// 	if (element) {
		// 		element.style.height = (contentHeight - 300) + 'px';
		// 	}
		// }
	}, [(request.data && request.data.data), contentHeight, contentWidth]);

	if (request.loading) {
		return (
			<div style={{ height: contentHeight - 220 }}>
				<Spinner show={true} />
			</div>
		);
	}

	function empty() {
		if (request.loading) {
			return null;
		}
		if (request.data) {
			return (
				<Empty description={request.data.ed || request.data.msg} />
			);
		}
	}

	return (
		<div className={style['cat-articale']}>
			<div className={classNames('horizontal-flow', style['heading'])}>
				{titlePath && <Icon
					component={AntrikaBackIcon}
					className={style['back-icon']}
					style={{ marginRight: '6px' }}
					onClick={() => customHistoryPush(titlePath)}
				/>}
				<div>
					{filters.selectedCategory}
				</div>
			</div>
			<div className={style['content']} ref={listRef}>
				<ConfigProvider renderEmpty={empty}>
					<List
						itemLayout='vertical'
						size='large'
						pagination={(request.data && request.data.data && request.data.data.length < 10) ? false : { pageSize: 10 }}
						dataSource={request.data && request.data.data}
						renderItem={item => (
							<List.Item
								key={item.title}
							>
								<List.Item.Meta
									title={<div className={style['title-container']}>
										<Link to={match.params.catslug + '/' + item.slug}>
											<Icon className={listIcon ? style['list-icon'] : style['icon']} component={listIcon || IdeaIcon} /><span>{item.title}</span>
										</Link>
										{
											item?.statusIcon &&
											<TooltipHelp helpText={item?.hint || ''} position='right'>
												<img src={item.statusIcon} className={style['status-icon']} />
											</TooltipHelp>
										}
									</div>}
									description={item.description}
								/>
								{item.content}
							</List.Item>
						)}
					/>
				</ConfigProvider>
			</div>
			{
				isNotEmptyArray(request.data?.summary) &&
				<div className={style['summary-container']}>
					{
						request.data.summary.map((el, elIndex) => {
							return (
								<div
									key={el?.key}
									className={style['item']}
									style={elIndex < request.data.summary.length - 1 ? { borderRight: '1px solid #29384633', marginRight: '5px' } : {}}
								>
									{
										el?.icon &&
										<img src={el?.icon} />
									}
									<span>{el?.key}&nbsp;</span>
									{
										(el?.order || el?.order === 0) &&
										<span style={{ color: el?.cc }}>{el.order}/</span>
									}
									<span>{el?.value}</span>
								</div>
							);
						})
					}
				</div>

			}
		</div>
	);
}

export default CategoryArticles;
