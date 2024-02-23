import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon, { PaperClipOutlined } from '@ant-design/icons';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Spin from 'antd/es/spin';
import { Form } from 'react-final-form';
import { Fragment } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames';

import { useCurrentUser, useFetch } from '../../../../hooks';
import Locale from '../../locale';
import Spinner from '../../../common/spinner';
import ErrorApi from '../../../common/form/dynamic-fields/error-api';
import { responseError } from '../../../../utils/object-util';
import { isNotEmptyArray, isNotEmptyObject } from '../../../../utils/type-util';
import TextAreaField from '../../../common/form/text-area-field';
import DynamicUploadField from '../../../common/form/dynamic-fields/dynamic-upload-field';
import DownloadIcon2 from '../../../../../icons/download-icon-2';
import CommentIcon3 from '../../../../../icons/comment-icon-3';
import TooltipHelp from '../../../common/tooltip-help';
import SendIcon from '../../../../../icons/send-icon';
import CrossIcon from '../../../../../icons/cross-icon';
import UserIcon from '../../../../../icons/user-icon';
import PdfPng from '../../../../../img/pdf-colored.png';
import FilePng from '../../../../../img/file.png';
import WordPng from '../../../../../img/word-colored.png';
import CSVPng from '../../../../../img/csv-icon.png';
import ExcelPng from '../../../../../img/excel-icon.png';
import Modal from '../../../common/modal';
import { api } from '../../../../api';
import UploadInputModalV2 from '../../../common/input/upload-input/upload-input-modal-v-2';

import style from './popup-messages-section.scss';

function PopupMessagesSection({ commentListApiUrl, addCommentApiUrl, params, setMessageState, extraParams, styleHeight }) {
	const [user] = useCurrentUser();
	const [allAttachmentsModal, setAllAttachmentsModal] = useState({});
	const [initialValues, setInitialValues] = useState({ attachment: [] });
	const [previewImage, setPreviewImage] = useState(null);

	const messagesResponse = useFetch({
		request: api.callGetwithParams,
		dontCall: !commentListApiUrl,
		payload: {
			url: commentListApiUrl,
			params: params
		}
		// request: Axios.get,
		// payload: 'https://run.mocky.io/v3/2e5c904d-7c2e-496d-b95a-876a908e36e0' //iden: attendance-messages
	});

	useEffect(() => {
		if (setMessageState) {
			setMessageState({
				refresh: messagesResponse.refresh
			});
		}
	}, [messagesResponse.data]);

	const onRemoveImg = (values, index) => {
		let attachment = values.attachment;
		attachment.splice(index, 1);
		setInitialValues({ ...values, attachment: attachment });
	};

	const onSubmit = (values, form) => {
		let submitAttachments = [];
		if (isNotEmptyArray(values.attachment)) {
			submitAttachments = values.attachment.map(el => {
				let obj = { ...el };
				obj.url = obj.url.substring(obj.url.indexOf('.com/') + 5);
				return obj;
			});
		}

		if (addCommentApiUrl) {
			return api.callPostwithParams({
				url: addCommentApiUrl,
				data: {
					id: params?.id || '',
					comment: values.comment,
					attachment: submitAttachments
				},
				params: extraParams
			}).then(r => {
				if (r.data?.s) {
					toast.success(r.data?.msg || 'Successfully Commented!', { autoClose: 2500 });
					messagesResponse.refresh();
					setTimeout(() => form.reset());
					setAllAttachmentsModal({});
					setInitialValues({ attachment: [] });
				} else {
					toast.error(r.data?.ed || 'Something went wrong!', { autoClose: 2500 });
				}
			}, err => {
				toast.ed(responseError(err) || 'Something went wrong!', { autoClose: 2500 });
			});
		}
	};

	return <>
		<div className='semibold font-14'>
			<span><Locale name='messages' title='Messages' /> -&nbsp;</span>
			{!isNaN(messagesResponse.data?.comment?.length) && <span className='link-color'>{messagesResponse.data.comment.length}</span>}
		</div>
		{messagesResponse.loading && !messagesResponse.data?.s && <Spinner />}
		{
			!messagesResponse.loading && !messagesResponse.data?.s &&
            <ErrorApi
            	refreshCall={messagesResponse.refresh}
            	msg={responseError(messagesResponse.error) || messagesResponse.data?.ed || 'Something went wrong!'}
            />
		}
		{
            messagesResponse.data?.s &&
            <div className={style['message-outer-div']}>
            	<div className={style['message-inner-div']} style={styleHeight}>
            		{
            			!isNotEmptyArray(messagesResponse.data.comment) &&
                        <div className={style['no-message-div']}>
                        	<Icon component={CommentIcon3} className={style['no-message-div-icon']} />
                        	<div className={style['no-message-div-msg']}>
                        		{messagesResponse.data?.ed || messagesResponse.data?.msg || 'No Messages Found!'}
                        	</div>
                        </div>
            		}
            		{
            			isNotEmptyArray(messagesResponse.data.comment) && messagesResponse.data.comment.map((item, itemIndex) =>
            				<CommentCard
            					key={item.id || itemIndex}
            					data={item}
            					setPreviewImage={setPreviewImage}
            					previewImage={previewImage}
            					setAllAttachmentsModal={setAllAttachmentsModal}
            				/>
            			)
            		}
            	</div>
            	<Form
            		onSubmit={onSubmit}
            		initialValues={initialValues}
            		render={({ handleSubmit, values, submitting }) => {
            			const isSubmitDisabled = !(values?.comment?.trim());
            			return <>
            				<form onSubmit={handleSubmit} className={style['comment-form']} >
            					<Row>
            						<Col className={style['input-container']}>
            							<TextAreaField
            								placeholder={user?.locale?.['enter_your_message'] || 'Enter Your Message'}
            								name='comment'
            								autoSize={{ minRows: 3, maxRows: 3 }}
            							/>
            						</Col>
            					</Row>

            					<Row>
            						<div className={style['button-container']}>
            							{
            								isNotEmptyArray(values?.attachment) &&
                                            <>
                                            	<div className={style['img-container']}>
                                            		{
                                            			values.attachment.map((el, elIndex) => {
                                            				let url = el?.url;
                                            				return (
                                            					<>
                                            						{
                                            							(elIndex < 3) &&
                                                                        <div key={elIndex} className={style['img-item']}>
                                                                        	<div className={style['cross-container']}>
                                                                        		<Icon component={CrossIcon} className={style['cross-icon']} onClick={() => onRemoveImg(values, elIndex)} />
                                                                        	</div>
                                                                        	<img src={buildIcon(url)} key={url} onClick={() => buildIcon(url) === url ? setPreviewImage(url) : window.open(url, '_blank')} />
                                                                        </div>
                                            						}
                                            					</>
                                            				);
                                            			}
                                            			)
                                            		}
                                            		{
                                            			values.attachment.length > 3 &&
                                                        <div className={style['img-item']} style={{ height: '30px', width: '30px' }} onClick={() => setAllAttachmentsModal({ attachment: values?.attachment, title: 'Attachments' })}>
                                                        	<img src={buildIcon(values.attachment[3]?.url)} />
                                                        	<div className={style['overlay']}>
                                                        		<span>+{values.attachment.length - 3}</span>
                                                        	</div>
                                                        </div>
                                            		}
                                            	</div>
                                            	{/* <UploadInputModal
                                            		isOpen={previewImage !== null}
                                            		onRequestClose={() => setPreviewImage(null)}
                                            		title='Preview'
                                            		previewImage={previewImage}
                                            		downLoadImage={false}
                                            		setPreviewImage={setPreviewImage}
                                            	/> */}
                                            	{previewImage &&
								<UploadInputModalV2
									isOpen={previewImage !== null}
									onRequestClose={() => setPreviewImage(null)}
									title='Preview'
									previewImage={previewImage}
									setPreviewImage={setPreviewImage} />}
                                            </>
            							}
            							<DynamicUploadField
            								name=''
            								uploadfolder='comment-attachment'
            								data={{
            									id: 'attachment',
            									type: 'all',
            									o: true
            								}}
            							>
            								<PaperClipOutlined className={style['paper-clip-container']} />
            							</DynamicUploadField>

            							<div
            								className={classNames(style['send-icon-container'], (isSubmitDisabled || submitting) ? style['disabled'] : '')}
            								onClick={() => (isSubmitDisabled || submitting) ? null : handleSubmit()}
            							>
            								{submitting && <Spin size='small' style={{ marginTop: '-10px' }} />}
            								{!submitting && <Icon component={SendIcon} className={style['send-icon']} />}
            							</div>
            						</div>
            					</Row>
            				</form>
            			</>;
            		}}
            	/>
            </div>
		}
		{
			isNotEmptyObject(allAttachmentsModal) &&
            <AllAttachmentsModal
            	isOpen={isNotEmptyObject(allAttachmentsModal)}
            	onRequestClose={() => setAllAttachmentsModal({})}
            	data={allAttachmentsModal}
            />
		}
	</>;
}

function CommentCard({ data, setPreviewImage, previewImage, setAllAttachmentsModal }) {
	const [attachments, setAttachments] = useState({});

	useEffect(() => {
		if (isNotEmptyArray(data?.attachment)) {
			let img = [];
			let doc = [];
			data.attachment.map(el => {
				let url = el;
				let extension = url.substring(url.lastIndexOf('.') + 1, url.length);
				if (extension === 'jpeg' || extension === 'png' || extension === 'jpg' || extension === 'JPG' || extension === 'PNG') {
					img.push(url);
				} else {
					doc.push(url);
				}
			});
			setAttachments({
				images: img,
				doc: doc
			});
		}
	}, [data.attachment]);

	return (
		<div className={style['comment-card']}>
			{data.title && <div className={style['comment-card-title']}>{data.title}</div>}
			<div className={style['comment-txt']}>{data.comment}</div>
			{
				isNotEmptyArray(attachments?.images) &&
				<div className={style['img-container']} style={{ width: '100%', margin: '12px 0 6px 0' }}>
					{
						attachments.images.map((el, elIndex) =>
							<Fragment key={elIndex}>
								{
									(elIndex < 2) &&
									<div className={style['img-item']}>
										<img src={el} width={74} height={74} key={el} onClick={() => setPreviewImage(el)} />
									</div>
								}
							</Fragment>
						)
					}
					{
						attachments.images.length > 2 &&
						<div className={style['img-item']} onClick={() => setAllAttachmentsModal({ attachment: attachments.images, title: 'Attachments' })}>
							<img src={buildIcon(attachments.images[2])} width={74} height={74} />
							<div className={style['overlay']}>
								<span>+{attachments.images.length - 2}</span>
							</div>
						</div>
					}
					{/* <UploadInputModal
						isOpen={previewImage !== null}
						onRequestClose={() => setPreviewImage(null)}
						title='Preview'
						previewImage={previewImage}
						downLoadImage={false}
						setPreviewImage={setPreviewImage}
					/> */}
					{previewImage &&
								<UploadInputModalV2
									isOpen={previewImage !== null}
									onRequestClose={() => setPreviewImage(null)}
									title='Preview'
									previewImage={previewImage}
									setPreviewImage={setPreviewImage} />}
				</div>
			}
			{
				isNotEmptyArray(attachments?.doc) &&
				<div className={style['pdf-container']}>
					{
						attachments.doc.map((el, elIndex) =>
							<div key={elIndex} className={style['pdf-box']}>
								<div className={style['pdf-title-box']}>
									<div className={style['proofs-pdf-modal-div']}>
										<img src={buildIcon(el)} width={15} />
									</div>
									<div className={style['proofs-pdf-modal-title']}>{buildIcon(el, true)}</div>
								</div>
								<TooltipHelp helpText='Click to download.' position='right'>
									<button className={style['download-icon-div']} onClick={() => window.open(el, '_blank')}>
										<Icon component={DownloadIcon2} />
									</button>
								</TooltipHelp>
							</div>
						)
					}
				</div>
			}
			<div className={style['bottom-bar']}>
				<div className={style['left-section']}>
					<Icon className={style['user-icon']} component={UserIcon} />
					<span className={style['name']}>{data.creator}</span>
					{data.createdBy && <TooltipHelp helpText={data.createdBy} >
						<span className={style['subName']}>({data.createdBy})</span>
					</TooltipHelp>
					}
				</div>
				<div className={style['right-section']}>
					{data.time}
				</div>
			</div>
		</div>
	);
}

export function AllAttachmentsModal({ isOpen, onRequestClose, data, setImgAsRow }) {
	const [attachments, setAttachments] = useState({});
	const [previewImage, setPreviewImage] = useState(null);

	useEffect(() => {
		if (isNotEmptyArray(data?.attachment)) {
			let img = [];
			let doc = [];
			data.attachment.map(el => {
				let url = isNotEmptyObject(el) ? el?.url : el;
				let extension = url.substring(url.lastIndexOf('.') + 1, url.length);
				if (extension === 'jpeg' || extension === 'png' || extension === 'jpg' || extension === 'JPG' || extension === 'PNG') {
					img.push(url);
				} else {
					doc.push(url);
				}
			});
			setAttachments({
				images: img,
				doc: doc
			});
		}
	}, [data]);

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			title={data?.title}
			className={style['modal-container']}
		>

			<div className={style['upload-modal']}>
				<div className={style['image-doc']}>
					{
						isNotEmptyArray(data?.attachment) && isNotEmptyArray(attachments.images) &&
						<>
							<div className={style['heading']}><Locale name='images' title='Images' /></div>
							<Row className={style['image-container']} >
								{
									attachments.images.map((el, elIndex) =>
										<Col key={elIndex} style={ setImgAsRow && { display: 'contents' }}>
											<img src={el} key={el} onClick={() => setPreviewImage(el)} className={style['image']} />
										</Col>
									)
								}
								{/* <UploadInputModal
									isOpen={previewImage !== null}
									onRequestClose={() => setPreviewImage(null)}
									title='Preview'
									previewImage={previewImage}
									allPreviewUrl={attachments.images || []}
									setPreviewImage={setPreviewImage}
								/> */}
								{previewImage &&
								<UploadInputModalV2
									isOpen={previewImage !== null}
									onRequestClose={() => setPreviewImage(null)}
									title='Preview'
									previewImage={previewImage}
									allPreviewUrl={attachments.images || []}
									setPreviewImage={setPreviewImage} />}
							</Row>
						</>
					}
				</div>
				<div className={style['image-doc']}>
					{
						isNotEmptyArray(data?.attachment) && isNotEmptyArray(attachments.doc) &&
						<>
							<div className={style['heading']}><Locale name='documents' title='Documents' /></div>
							<Row className={style['image-container']}>
								{
									attachments.doc.map((el, elIndex) =>
										<Col key={elIndex}>
											<img src={buildIcon(el)} key={el} onClick={() => window.open(el, '_blank')} className={style['image']} />
										</Col>
									)
								}
							</Row>
						</>
					}
				</div>
			</div>

		</Modal>
	);
}

export function buildIcon(url, title) {
	let extension = url.substring(url.lastIndexOf('.') + 1, url.length);
	if (extension === 'pdf') {
		return title ? 'PDF File' : PdfPng;
	}
	if (extension === 'jpeg' || extension === 'png' || extension === 'jpg') {
		return url;
	}
	if (extension === 'doc' || extension === 'docx' || extension === 'docm' || extension === 'dot' || extension === 'dotm' || extension === 'dotx') {
		return title ? 'Word File' : WordPng;
	}
	if (extension === 'xls' || extension === 'xlsx' || extension === 'xlsm' || extension === 'xlsb' || extension === 'xltx' || extension === 'xltm' || extension === 'xlt') {
		return title ? 'Excel File' : ExcelPng;
	}
	if (extension === 'csv') {
		return title ? 'CSV File' : CSVPng;
	} else {
		return FilePng;
	}
}

PopupMessagesSection.propTypes = {
	commentListApiUrl: PropTypes.string,
	addCommentApiUrl: PropTypes.string,
	params: PropTypes.object,
	setMessageState: PropTypes.func,
	extraParams: PropTypes.object,
	styleHeight: PropTypes.object
};

export default PopupMessagesSection;

