
import React, { useState, useEffect } from 'react';
import { Col } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useFetch } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';
import IdeaIcon from '../../../../../../icons/idea-icon';

import style from './knowledge.scss';

function KnowledgeTopSearched({ history, match }) {
	const [leftArticles, setLeftArticles] = useState([]);
	const [rightArticles, setRightArticles] = useState([]);

	const request = useFetch({
		request: api.knowledgeBase.article.getAll,
		payload: {
			top_ten: true,
			knowledge_base_slug: match.params.kslug
		}
	});

	useEffect(() => {
		let arr1 = [];
		let arr2 = [];

		if (request.data && request.data.data) {
			request.data.data.map((el, i) => {
				if (el && i % 2 === 0) {
					return arr1.push(el);
				} else if (el) {
					return arr2.push(el);
				}
			});
		}

		setLeftArticles(arr1);
		setRightArticles(arr2);
	}, [request.data]);

	if (request.loading) {
		return <Spinner show={true} />;
	}

	return (
		<div className={classNames(style['top-articles'], style['two-col'])}>
			<h2 className={style.header}>
				Most Popular Articles
			</h2>

			<div className={style.aboveMobile}>
				{request.data && request.data.data.length > 0 &&
					<>
						<div className={style.left}>
							<ul className={style['popArticles']}>
								{
									leftArticles.map((article, i) => (
										<Col sm={24} key={i}>
											<li>
												<Link to={history.location?.pathname + '/' + article.categorySlug + '/' + article.slug} style={{ width: '100%' }}>
													<img className={style['icon']} src={IdeaIcon} />
													<span className={style['top-searched-links']} title={article.title}>
														{article.title}
													</span>
												</Link>
											</li>
										</Col>
									))
								}
							</ul >
						</div>
						<div className={style.right}>
							<ul className={style['popArticles']}>
								{
									rightArticles.map((article, i) => (
										<Col sm={24} key={i}>
											<li >
												<Link to={history.location?.pathname + '/' + article.categorySlug + '/' + article.slug} style={{ width: '100%' }}>
													<img className={style['icon']} src={IdeaIcon} />
													<span className={style['top-searched-links']} title={article.title}>
														{article.title}
													</span>
												</Link>
											</li>
										</Col>
									))
								}
							</ul >
						</div>
					</>
				}
			</div>
			<div>
				<div className={style.forMobile}>
					{request.data && request.data.data.length > 0 &&
						<ul className={style['popArticles']}>
							{
								request.data.data.map((article, i) => (
									// <Row>
									<Col sm={24} md={12} lg={12} xl={12} key={i}>
										<li >
											<Link to={history.location?.pathname + '/' + article.categorySlug + '/' + article.slug} style={{ width: '100%' }}>
												<img className={style['icon']} src={IdeaIcon} />
												<span className={style['top-searched-links']} title={article.title}>{article.title}</span>
											</Link>
										</li>
									</Col>
									// </Row>
								))
							}
						</ul >
					}
				</div>
				{
					request.data && request.data.data.length === 0 &&
					<div className={style['no-data']}>No Articles Found</div>
				}
			</div>

		</div >
	);
}

export default KnowledgeTopSearched;
