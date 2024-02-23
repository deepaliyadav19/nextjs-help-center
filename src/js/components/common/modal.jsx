
import React, { useState, useRef, useEffect } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import Icon from '@ant-design/icons';
import { saveAs } from 'file-saver';

import DownloadIcon2 from '../../../icons/download-icon-2';

import style from './modal.scss';
import TooltipHelp from './tooltip-help';

function Modal({ title, children, customCloseBtn, customCloseStyle, onRequestClose, headerExtraChild, bodyStyle, headerStyle, closeStyle, className, downloadIcon, customDownloadIcon, downloadIconStyle, downloadImageSrc, downloadInNewTab, hideHeader, bodyHeightCallBack, ...rest }) {
	const [disableDownload, setDisableDownload] = useState(false);
	const bodyRef = useRef();
	function onDownloadClick() {
		if (downloadImageSrc) {
			if (downloadInNewTab) {
				window.open(downloadImageSrc, '_blank');
			} else {
				var fileName = downloadImageSrc.substring(downloadImageSrc.lastIndexOf('/') + 1, downloadImageSrc.length);
				// var link = document.createElement('a');
				// link.href = downloadImageSrc;

				// link.download = fileName;

				// link.setAttribute('target','_blank');
				// document.body.appendChild(link);
				// link.click();
				// document.body.removeChild(link);

				var xhr = new XMLHttpRequest();
				setDisableDownload(true);
				let newSrc = downloadImageSrc;
				if (newSrc.includes('?')) {
					newSrc = (newSrc + '&cb=' + (new Date().getTime()));
				} else {
					newSrc = (newSrc + '?cb=' + (new Date().getTime()));
				}
				xhr.responseType = 'blob';
				xhr.open('GET', newSrc, true);

				xhr.onreadystatechange = function () {
					if (xhr && xhr.response && xhr.readyState === xhr.DONE) {
						saveAs(xhr.response, fileName);
					}
					setDisableDownload(false);
				};

				return xhr.send();
			}
		}
	}

	useEffect(() => {
		if (bodyRef && bodyRef.current && bodyHeightCallBack) {
			bodyHeightCallBack(bodyRef.current.clientHeight);
		}
	}, [bodyRef && bodyRef.current && bodyRef.current.clientHeight]);

	return (
		<ReactModal
			className={className || style.content}
			overlayClassName={style.overlay}
			portalClassName={style.portal}
			onRequestClose={onRequestClose}
			closeTimeoutMS={Modal.closeTimeoutMS}
			shouldCloseOnOverlayClick={false}
			{...rest}
		>
			{
				!hideHeader &&
				<div className={headerStyle || style.header}>
					{
						customCloseBtn ?
							<button type='button' className={customCloseStyle || style.close} onClick={onRequestClose}>{customCloseBtn}</button>
							 :

							<button type='button' className={closeStyle || style.close} onClick={onRequestClose}>&times;</button>
					}
					{!!downloadIcon &&
						<TooltipHelp helpText='Click to download.' position='right'>
							<div
								// disabled={disableDownload}
								className={downloadIconStyle ? downloadIconStyle : style['download-icon-div']}
								onClick={() => disableDownload ? void 0 : onDownloadClick()}
							>
								<Icon component={customDownloadIcon ? customDownloadIcon : DownloadIcon2} />
							</div>
						</TooltipHelp>
					}
					<h3>{title}</h3>
					{!!headerExtraChild && headerExtraChild}
				</div>
			}
			<div className={bodyStyle || style.body} style={hideHeader ? { height: '100%' } : {}} ref={bodyRef}>{children}</div>
		</ReactModal>
	);
}

Modal.closeTimeoutMS = 200;
Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onRequestClose: PropTypes.func,
	customCloseBtn: PropTypes.string,
	customCloseStyle: PropTypes.string,
	title: PropTypes.node,
	hideHeader: PropTypes.bool,
	children: PropTypes.node,
	headerExtraChild: PropTypes.node,
	className: PropTypes.string,
	bodyStyle: PropTypes.string,
	headerStyle: PropTypes.string,
	closeStyle: PropTypes.string,
	downloadIcon: PropTypes.bool,
	customDownloadIcon: PropTypes.object,
	downloadIconStyle: PropTypes.string,
	downloadImageSrc: PropTypes.string,
	downloadInNewTab: PropTypes.bool,
	bodyHeightCallBack: PropTypes.func
};

Modal.defaultProps = {
	isOpen: false
};
export default Modal;
