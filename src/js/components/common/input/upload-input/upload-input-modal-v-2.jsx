import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Icon, { DownloadOutlined, MinusOutlined, PlusOutlined, UndoOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Divider from 'antd/es/divider';

import Modal from '../../modal';
import { isArray, isNotEmptyArray, isNotEmptyObject } from '../../../../utils/type-util';
import PrevIcon from '../../../../../icons/prev-icon';
import TooltipHelp from '../../tooltip-help';

import style from './upload-input-modal-v-2.scss';

export default function UploadInputModalV2({ isOpen, onRequestClose, title, previewImage, downLoadImage, setPreviewImage, allPreviewUrl }) {

	const scaleUp = false;
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const [containerHeight, setContainerHeight] = useState(0);
	const [imageScale, setImageScale] = useState(0);
	const [container, setContainer] = useState(null);

	const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
	const [imageNaturalHeight, setImageNaturalHeight] = useState(0);

	const [min, setMin] = useState(true);
	const [max, setMax] = useState(false);

	const [functions, setFunctions] = useState({});

	useEffect(() => {
		updateIndexAndSize(previewImage);
	}, [previewImage]);

	useMemo(() => {
		if (containerWidth && containerHeight && imageNaturalWidth && imageNaturalHeight) calculateScale();
	}, [scaleUp,containerWidth,containerHeight,imageNaturalWidth,imageNaturalHeight, previewImage]);

	function calculateScale() {
		if (containerWidth === 0 || containerHeight === 0 || imageNaturalWidth === 0 || imageNaturalHeight === 0) {
			return 0;
		}
		const scale = Math.min(
			containerWidth / imageNaturalWidth,
			containerHeight / imageNaturalHeight
		);
		let data = scaleUp ? scale : Math.min(scale, 1);
		setImageScale(data);
	}

	const handleResize = useCallback(() => {
		if (container) {
			const rect = container.getBoundingClientRect();
			setContainerWidth(rect.width);
			setContainerHeight(rect.height);
		} else {
			setContainerWidth(0);
			setContainerHeight(0);
		}
	}, [container]);

	useEffect(() => {
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [handleResize]);

	useEffect(() => {
		if (isOpen) {
			const callback = event => {
				if (event.key === 'ArrowLeft') {
					callPrev();
				} else if (event.key === 'ArrowRight') {
					callNext();
				}
			};
			window.addEventListener('keydown', callback);
			return () => window.removeEventListener('keydown', callback);
		}
	}, [isOpen, currentImageIndex]);

	function updateIndexAndSize(newImg) {
		if (newImg) {
			if (isNotEmptyArray(allPreviewUrl)) {
				let index = allPreviewUrl.findIndex(el => {
					let url = isNotEmptyObject(el) ? el?.url : el;
					return url === newImg;
				});
				if (index > -1) {
					setCurrentImageIndex(index);
				}
			}
			const image = new Image();
			image.src = newImg;
			image.onload = () => {
				setImageNaturalWidth(image.naturalWidth);
				setImageNaturalHeight(image.naturalHeight);
			};
		}
	}

	const callPrev = () => {
		if (isNotEmptyArray(allPreviewUrl) && (allPreviewUrl.length > 1) && previewImage && setPreviewImage) {
			if (currentImageIndex > 0) {
				let url;
				if (isNotEmptyObject(allPreviewUrl[currentImageIndex - 1])) {
					url = allPreviewUrl[currentImageIndex - 1]?.url;
				} else {
					url = allPreviewUrl[currentImageIndex - 1];
				}
				updateIndexAndSize(url);
				setPreviewImage(url);
				calculateScale();
			}
		}
	};

	const callNext = () => {
		if (isNotEmptyArray(allPreviewUrl) && (allPreviewUrl.length > 1) && previewImage && setPreviewImage) {
			if (currentImageIndex < (allPreviewUrl.length - 1)) {
				let url;
				if (isNotEmptyObject(allPreviewUrl[currentImageIndex + 1])) {
					url = allPreviewUrl[currentImageIndex + 1]?.url;
				} else {
					url = allPreviewUrl[currentImageIndex + 1];
				}
				updateIndexAndSize(url);
				setPreviewImage(url);
				calculateScale();
			}
		}
	};
	const handleTransform = e => {
		if (e?.instance) {
			let minScale = e.instance.props.minScale;
			let maxScale = e.instance.props.maxScale;
			if (e.state.scale <= minScale) {
				setMin(true);
			} else {
				setMin(false);
			}
			if (e.state.scale >= maxScale) {
				setMax(true);
			} else {
				setMax(false);
			}
		}
	};

	return (
		<div>
			<Modal
				isOpen={isOpen}
				onRequestClose={onRequestClose}
				customCloseBtn={
					<div>
						{downLoadImage && <Divider type='vertical' className={style['v-divider']} />}
						Close
					</div>
				}
				customCloseStyle={style['close-btn']}
				downloadIcon={downLoadImage === undefined ? !!previewImage : downLoadImage}
				downloadIconStyle={style['download-icon-btn']}
				customDownloadIcon={DownloadOutlined}
				downloadImageSrc={previewImage}
				headerStyle={style.header}
				title={
					<>
						{title}
						<div className={style['buttons-div']}>
							<TooltipHelp helpText='Zoom Out' position='bottom'>
								<MinusOutlined className={classNames(style['btns'], (min) ? style['disabledBtns'] : '')} onClick={() => functions.zoomOut()} />
							</TooltipHelp>

							<Divider type='vertical' className={style['v-divider']} />

							<TooltipHelp helpText='Zoom In' position='bottom'>
								<PlusOutlined className={classNames(style['btns'], (max) ? style['disabledBtns'] : '')} onClick={() => functions.zoomIn()} />
							</TooltipHelp>

							<Divider type='vertical' className={style['v-divider']} />

							<TooltipHelp helpText='Reset' position='bottom'>
								<UndoOutlined className={style['btns']} onClick={() => functions.resetTransform()} />
							</TooltipHelp>
						</div>
					</>
				}
				bodyStyle={style.bodyStyle}
				className={style['modal']}
			>
				<div className={style['img-container']}>
					{isArray(allPreviewUrl) && (allPreviewUrl.length) > 1 && setPreviewImage &&
						<div className={classNames(style['prev-div'], (currentImageIndex > 0) ? '' : style['disabled-btn'])} onClick={callPrev}>
							<Icon component={PrevIcon} className={style['prev-icon']} />
						</div>
					}
					<div
						style={{
							width: (allPreviewUrl.length > 1) ? 'calc(100% - 55px)' : '100%',
							height: '100%',
							backgroundColor: '#fff'
						}}
						ref={setContainer}
    				>
						{imageScale > 0 && (
							<TransformWrapper
								key={`${ containerWidth }x${ containerHeight }x${ previewImage }`}
								initialScale={imageScale}
								minScale={imageScale}
								maxScale={imageScale * 8}
								wheel={{
									smoothStep: 0.008
								}}
								pinch={{
									step: 10
								}}
								centerOnInit
								onInit={e => {
									setFunctions({
										zoomIn: e.zoomIn,
										zoomOut: e.zoomOut,
										resetTransform: e.resetTransform
									});
								}}
								onTransformed={handleTransform}
							>
								<TransformComponent
									wrapperStyle={{
										width: '100%',
										height: '100%',
										backgroundColor: 'var(--color-brand-antrika-roadmapFilter-inner)'
									}}
									contentStyle={{
										cursor: 'grab'
									}}
								>
									<img alt={'preview-image'} src={previewImage} />
								</TransformComponent>
							</TransformWrapper>
						)}
					</div>
					{isArray(allPreviewUrl) && (allPreviewUrl.length) > 1 && setPreviewImage &&
					<div className={classNames(style['next-div'], (currentImageIndex < (allPreviewUrl.length - 1)) ? '' : style['disabled-btn'])} onClick={callNext}>
						<Icon component={PrevIcon} className={style['next-icon']} />
					</div>}
				</div>
			</Modal>
		</div>
	);
}

UploadInputModalV2.defaultProps = {
	allPreviewUrl: []
};

UploadInputModalV2.propTypes = {
	isOpen: PropTypes.bool,
	onRequestClose: PropTypes.func,
	title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	previewImage: PropTypes.string,
	downLoadImage: PropTypes.bool,
	allPreviewUrl: PropTypes.oneOf([PropTypes.string, PropTypes.array]),
	setPreviewImage: PropTypes.func
};

