
import { useContext } from 'react';

import { AppContext } from '../global/context';
import { ThemeContext } from '../global/context';

/**
 * Uses the currently logged in user.
 *
 * @example
 * <code>
 *     let [ user, syncUser ] = useCurrentUser();
 * </code>
 *
 * @returns {Object}
 */
export function useCurrentUser() {

	let contextData = useContext(AppContext) || {};
	let { user, syncUser } = contextData;

	return [user, syncUser];
}

export function useCurrentTheme() {

	let contextData = useContext(ThemeContext) || {};
	let { theme, syncTheme } = contextData;

	return [theme, syncTheme];
}

export function useContentHeight() {
	let { contentHeight } = useContext(AppContext);
	return contentHeight;
}

export function useUserPermission() {
	let { userPermission } = useContext(AppContext);
	return userPermission;
}

export function useContentWidth() {
	let { contentWidth } = useContext(AppContext);
	return contentWidth;
}

export function useCloneData() {
	let { cloneData, syncCloneData } = useContext(AppContext);
	return [cloneData, syncCloneData];
}

export function useDynamicMenu() {
	let { dynamicMenu, syncDynamicMenu } = useContext(AppContext);
	return [dynamicMenu, syncDynamicMenu];
}

export function useChatLeftOptions() {
	let { chatLeftOptions, setChatLeftOptions } = useContext(AppContext);
	return [chatLeftOptions, setChatLeftOptions];
}
