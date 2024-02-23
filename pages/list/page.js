// 'use client'
// import React from 'react';
// import { List } from 'antd';
// import classNames from 'classnames';
// // import { Link } from 'react-router-dom';

// import style from './knowledge.scss';

// function Page({ repo }) {
// 	// const [localFilter, setLocalFilter] = useLocalFilter('local-filter');
//   console.log({ repo });
// 	return (
// 		<div className={classNames(style['knowledge-body'])}>
// 			<List
// 				itemLayout='horizontal'
// 				dataSource={'request && request.data && request.data.data' || []}
// 				renderItem={item => (
// 					<div>
// 						<List.Item>
// 							<List.Item.Meta
// 								title={<span style={{ fontSize: '15px' }}>{item.title}</span>}
// 							// actions={[<a key='list-loadmore-edit'>edit</a>]}
// 							/>
// 						</List.Item>
// 					</div>
// 				)}
// 			/>
// 		</div>
// 	);
// }

// // export function getArticleCount(catSlug, artSlug) {
// // 	return api.knowledgeBase.article.getCount({
// // 		category_slug: catSlug,
// // 		article_slug: artSlug
// // 	});
// // }

// // export async function getServerSideProps() {
// //   // Fetch data from external API
// //   const res = await fetch('https://api.github.com/repos/vercel/next.js')
// //   const repo = await res.json()
// //   // Pass data to the page via props
// //   return { props: { repo } }
// // }

// export default Page;