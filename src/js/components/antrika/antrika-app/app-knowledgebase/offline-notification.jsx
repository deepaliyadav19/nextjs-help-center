
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useOnlineStatus } from '../../../../hooks';

function OfflineNotification() {

	let [ wasOffline, setWasOffline ] = useState(false);
	let onlineStatus = useOnlineStatus();
	let toastId = 'offline';

	useEffect(() => {

		if (!onlineStatus && !wasOffline) {

			toast.error('You are currently offline.', { toastId, autoClose: false });
			setWasOffline(true);

		} else if (onlineStatus && wasOffline) {

			if (toast.isActive(toastId)) {
				toast.update(toastId, {
					type: toast.TYPE.SUCCESS,
					render: 'You are connected.',
					autoClose: 3000
				});
			} else {
				toast.success('You are connected.', {
					autoClose: 3000
				});
			}

			setWasOffline(false);
		}
	}, [ onlineStatus, wasOffline ]);

	return null;
}

export default OfflineNotification;
