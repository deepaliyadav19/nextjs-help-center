
import React from 'react';
import { Row, Col } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { isNotEmptyArray } from '../../../../../utils/type-util';
import defaultIcon from '../../../../../../img/categoryDefault.png';
import IdeaIcon from '../../../../../../icons/idea-icon';

import style from './knowledge.scss';

function KnowledgeSection({ history, categories, policy }) {
	return (
		<div className={classNames(style.articlesWidget)}>
			{isNotEmptyArray(categories) &&
			<Row>
				{
					categories.map((category, i) => (
						<Col sm={24} md={12} lg={8} xl={8} key={i}>
							<div className={style['category-outer']}>
								<Link to={history.location?.pathname + '/' + category.slug}>
									<div className={style['category']} >
										<div className={style.topDiv}>
											<img src={category.thumb || defaultIcon} />
											<div className={style.title}>
												{category.title}
											</div>
										</div>
										<div className={style.desc} title={category.desc}>
											{category.desc}
										</div>
										<div className={style.bottomDiv}>
											<div className={style.footer}>
												<img src={IdeaIcon} /><span className={style.text}>{category.articles} {policy ? 'Policies' : 'Articles'}</span>
											</div>
										</div>
										{/* <div className={style.iconArea}>
											<img src={category.thumb || defaultIcon} />
										</div>
										<div className={style.contentArea}>
											<div className={style.header}>
												{category.title}
											</div>
											<div className={style.content} title={category.desc}>
												{category.desc}
											</div>
											<div className={style.footer}>
												<img src={Ideaicon} /><span className={style.text}>{category.articles} Articles</span>
											</div>
										</div> */}
									</div>
								</Link>
							</div>
						</Col>
					))
				}
			</Row >}
			{
				categories.length === 0 &&
					<div>
						<div className={style['no-data']}>No Collection Found</div>
					</div>
			}

		</div >
	);
}

export default KnowledgeSection;
