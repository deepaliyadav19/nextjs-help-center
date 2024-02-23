import React from 'react';
import { Button, Col, Row } from 'antd';

import style from './knowledge.module.scss';
import { isNotEmptyArray } from '@/src/js/utils/type-util';

export async function getServerSideProps() {
	const res = await fetch('https://run.mocky.io/v3/5b7a539e-3ef1-4e90-91ef-41f107d410b0')
	const repo = await res.json()
	return { props: { repo } }
  }

function Page({ repo }) {
  	console.log({ repo });
	return ( 
		<div>
			<Button>wer</Button>
		</div>
		// <Row gutter={[16, 24]}>
		// 	{isNotEmptyArray(repo?.data) &&
		// 		repo.data.map((item, itemIndex) => (
		// 		<Col key={itemIndex}>
		// 			<div>
		// 			<div className={style['article-container']}>
		// 				<div className={style['left-container']}>
		// 					<img src={item.icon} style={{ width: '40px' }} />
		// 				</div>
		// 				<div className={style['right-container']}>
		// 					<h3 className={style.title}>{item.title}</h3>
		// 					<p className={style.desc}>{item.desc}</p>
		// 					<div className={style.footer}>
		// 						<img
		// 							src={item.thumb}
		// 							style={{ width: '24px', borderRadius: '50%' }}
		// 								/>
		// 						<div style={{ margin: '0 6px' }} className={style['extra-text']} title={item.users}>{item.users}</div>
		// 						<div className={style['dot']} />
		// 						<div style={{ margin: '0 6px' }}>{item.noOfArticle}</div>
		// 						<div>articles</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 			</div>
		// 		</Col>
        // ))}
		// </Row>
	);
}

export default Page;