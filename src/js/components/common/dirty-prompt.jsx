
import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'antd/es/button';
import PropTypes from 'prop-types';

import { customHistoryPush } from '../../auth/custom-route';

import style from './dirty-prompt.scss';
import BrowserPrompt from './browser-prompt';
import Modal from './modal';

function DirtyPrompt({ dirty }) {

	let [ open, setOpen ] = useState(false);
	let [ confirmed, setConfirmed ] = useState(false);
	let [ lastLocation, setLastLocation ] = useState(null);

	useEffect(() => {
		if (confirmed) {
			setOpen(false);
			setTimeout(() => {
				customHistoryPush(lastLocation);
			}, Modal.closeTimeoutMS);
		}
	}, [ confirmed, lastLocation ]);

	let handleBlockedNavigation = nextLocation => {
		if (!confirmed) {
			setLastLocation(nextLocation);
			setOpen(true);
			return false;
		}
		return true;
	};

	let onCancel = () => {
		setOpen(false);
	};

	let onConfirm = () => {
		if (lastLocation) {
			setConfirmed(true);
		}
	};

	return (
		<Fragment>
			<BrowserPrompt when={ dirty } message={ handleBlockedNavigation } />
			<Modal isOpen={ open } onRequestClose={ onCancel } title='Changes Are Not Saved !' className={style['box']} headerStyle={style.header}>
				<p className={style['text']}>The current page contains unsaved changes that will be lost if you leave this page. Do you really want to discard your changes?</p>
				<div className={ style.actions }>
					<Button.Group>
						<Button onClick={ onCancel }>Cancel</Button>
						<Button type='primary' danger onClick={ onConfirm }>Discard</Button>
					</Button.Group>
				</div>
			</Modal>
		</Fragment>
	);
}

DirtyPrompt.propTypes = {
	dirty: PropTypes.bool.isRequired,
	history: PropTypes.object.isRequired
};

export default withRouter(DirtyPrompt);
