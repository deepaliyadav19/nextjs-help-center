
import React, { useState } from 'react';
import { Empty } from 'antd';

import { useContentHeight, useFetch } from '../../../../../hooks';
import { api } from '../../../../../api';
import Spinner from '../../../../common/spinner';
import UploadInputModalV2 from '../../../../common/input/upload-input/upload-input-modal-v-2';

import style from './category.scss';

// const ReactMarkdown = require('react-markdown/with-html');

function CategoryArticleDetail({ match }) {
	let contentHeight = useContentHeight();
	const [previewImage, setPreviewImage] = useState(null);

	const request = useFetch({
		request: api.knowledgeBase.article.getBySlug,
		payload: {
			article_slug: match.params.artslug
		}
	});

	if (request.loading) {
		return (
			<div style={{ height: contentHeight - 220 }}>
				<Spinner show={true} />
			</div>
		);
	}

	// function Image(props) {
	// 	return <img {...props} style={{ maxWidth: '100%' }} />;
	// }

	if (!request.loading && (request?.data?.ed || request?.data.msg)) {
		return (
			<div style={{ height: contentHeight - 220 }}>
				<Empty description={request.data?.ed || request.data?.msg} />
			</div>
		);
	}
	const onClickHandle = e => {
		if (e?.target?.currentSrc) {
			setPreviewImage(e.target?.currentSrc);
		}
	};

	return (
		<div className={style['cat-articale-detail']}>
			<div className={style['heading']}>
				{request.data && request.data.title}
			</div>
			<div className={style['content']}
			//  style={{ height: (contentHeight - 200) + 'px' }}
			 >
				{/* <ReactMarkdown
					source={request.data.desc}
					escapeHtml={false}
					renderers={{ image: Image }} */}
				<div
					onClick={onClickHandle}
					dangerouslySetInnerHTML={{ __html: request.data ? request.data.desc : '' }}
				/>
			</div>
			{previewImage &&
						<UploadInputModalV2
							isOpen={previewImage !== null}
							onRequestClose={() => setPreviewImage(null)}
							title='Preview'
							previewImage={previewImage}
							downLoadImage={false}
							setPreviewImage={setPreviewImage}
						/>
			}
		</div>
	);
}

export default CategoryArticleDetail;
