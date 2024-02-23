export const lightThemeColors = {  // when dark
	light: '#F8F9FA',
	light2: '#F1F3F4',
	light3: '#DADCE0',
	light4: '#BDC1C6',
	dark: '#0E1013',
	dark50: '#0d0f1280',
	dark2: '#202124',
	dark3: '#3C4043',
	dark4: '#5F6368',
	dark5: '#80868B',
	dark6: '#17181B'
};

export const darkThemeColors = {   // when light
	background: '#ffffff',
	background50: '#ffffff80',
	secondary: '#0d192b',
	navText: '#555E6A',
	secondaryText: '#333333',
	primary: '#f1f4f9',
	primaryDark: '#e6ebf2',
	likeContainer: '#F8F9FB',
	likeContainerBorder: '#e0e2e6',
	noPost: '#F6F7FA',
	darkColor: '#000000',
	divider: '#dadce0',
	feedbackCard: '#ecf0f669',
	heart: '#0000004d',
	dropdownArrow: '#00000040',
	feedbackBoard: '#E7EBF2',
	modalBorder: '#000c1724',
	attachFile: '#f2f4f79e',
	postRight: '#f2f5f9bd',
	suggestedLike: '#f4f6f9a6',
	suggestedLikeBorder: '#c8ccd280',
	count: '#e2e7ee',
	loginCard: '#f2f5f9cc',
	loginCardBr: '#D7DCE0',
	resultBg: '#ebf4fb',
	navSelect: '#1677ff',
	selectBg: '#e7f2ff',
	emojiBorder: '#0070d257',
	emojiBg: '#0070d114',
	selectBorder: '#aaa',
	overlayBg: '#00000066',
	cancelBtn: '#000000e0'
};

export function setChatThemeDark() { // when dark
	document.documentElement.style.setProperty('--color-brand-antrika-background', lightThemeColors.dark);
	document.documentElement.style.setProperty('--color-brand-antrika-background-50', lightThemeColors.dark50);
	document.documentElement.style.setProperty('--color-brand-antrika-secondary', lightThemeColors.light);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmapFilter-main', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmapFilter-inner', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-nav', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-secondary-text', lightThemeColors.light2);
	document.documentElement.style.setProperty('--color-brand-antrika-navText', lightThemeColors.light3);
	document.documentElement.style.setProperty('--color-brand-antrika-primary-blue', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-primary-blue-dark', lightThemeColors.dark);
	document.documentElement.style.setProperty('--color-brand-antrika-search-bar', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card', lightThemeColors.dark4);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-like-container', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-like-container-border', 'transparent');
	document.documentElement.style.setProperty('--color-brand-antrika-no-post', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-setting-drawer', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-close-btn', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-divider', lightThemeColors.dark5);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-inner', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-left-section', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-opacity-light', 0.8);
	document.documentElement.style.setProperty('--color-brand-antrika-opacity-lighter', 0.6);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-heart', lightThemeColors.dark4);
	document.documentElement.style.setProperty('--color-brand-antrika-comment-input', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-clip', lightThemeColors.light);
	document.documentElement.style.setProperty('--color-brand-antrika-dropdown-arrow', lightThemeColors.light);
	document.documentElement.style.setProperty('--color-brand-antrika-placeholder', lightThemeColors.dark4);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-boards', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-explore-modal-border', 'transparent');
	document.documentElement.style.setProperty('--color-brand-antrika-search-border', 'rgba(248, 249, 250, 14%)');
	document.documentElement.style.setProperty('--color-brand-antrika-modal-shadow', `0 1px 0 ${ lightThemeColors.dark2 }`);
	document.documentElement.style.setProperty('--color-brand-antrika-attach-file', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-crate-post-right', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-bg', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card-bg', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card-divider', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-status-bg', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-status-border', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-suggested-like', lightThemeColors.dark);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-suggested-like-border', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-stats-count', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-login-card', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-login-card-border', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-search-result-bg', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-search-result', lightThemeColors.light4);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-search-result', lightThemeColors.light4);
	document.documentElement.style.setProperty('--color-brand-nav-select', lightThemeColors.light);
	document.documentElement.style.setProperty('--color-brand-nav-select-bg', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-emoji-border', lightThemeColors.dark4);
	document.documentElement.style.setProperty('--color-brand-antrika-emoji-bg', lightThemeColors.dark3);
	document.documentElement.style.setProperty('--color-brand-antrika-select-border', 'transparent');
	document.documentElement.style.setProperty('--color-brand-antrika-unselect-board', lightThemeColors.dark2);
	document.documentElement.style.setProperty('--color-brand-antrika-explore-bg', lightThemeColors.dark6);
	document.documentElement.style.setProperty('--color-brand-antrika-modal-overlay-bg', 'rgba(23,24,27, 0.65)');
	document.documentElement.style.setProperty('--color-brand-antrika-cancel-btn', lightThemeColors.dark3);
}

export function setChatThemeLight() { //when light
	document.documentElement.style.setProperty('--color-brand-antrika-background', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-background-50', darkThemeColors.background50);
	document.documentElement.style.setProperty('--color-brand-antrika-secondary', darkThemeColors.secondary);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmapFilter-main', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmapFilter-inner', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-nav', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-secondary-text', darkThemeColors.secondaryText);
	document.documentElement.style.setProperty('--color-brand-antrika-navText', darkThemeColors.navText);
	document.documentElement.style.setProperty('--color-brand-antrika-primary-blue', darkThemeColors.primary);
	document.documentElement.style.setProperty('--color-brand-antrika-primary-blue-dark', darkThemeColors.primaryDark);
	document.documentElement.style.setProperty('--color-brand-antrika-search-bar', darkThemeColors.primary);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-bg', darkThemeColors.primary);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card-bg', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-card-divider', darkThemeColors.primary);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-status-bg', darkThemeColors.primaryDark);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-status-border', darkThemeColors.modalBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-like-container', darkThemeColors.likeContainer);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-like-container-border', darkThemeColors.likeContainerBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-no-post', darkThemeColors.noPost);
	document.documentElement.style.setProperty('--color-brand-antrika-setting-drawer', darkThemeColors.noPost);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-close-btn', darkThemeColors.darkColor);
	document.documentElement.style.setProperty('--color-brand-antrika-divider', darkThemeColors.divider);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-inner', darkThemeColors.background);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-left-section', darkThemeColors.feedbackCard);
	document.documentElement.style.setProperty('--color-brand-antrika-opacity-light', 1);
	document.documentElement.style.setProperty('--color-brand-antrika-opacity-lighter', 1);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-heart', darkThemeColors.heart);
	document.documentElement.style.setProperty('--color-brand-antrika-comment-input', darkThemeColors.nav);
	document.documentElement.style.setProperty('--color-brand-antrika-clip', darkThemeColors.darkColor);
	document.documentElement.style.setProperty('--color-brand-antrika-dropdown-arrow', darkThemeColors.dropdownArrow);
	document.documentElement.style.setProperty('--color-brand-antrika-placeholder', darkThemeColors.dropdownArrow);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-boards', darkThemeColors.feedbackBoard);
	document.documentElement.style.setProperty('--color-brand-antrika-explore-modal-border', darkThemeColors.modalBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-search-border', darkThemeColors.modalBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-modal-shadow', `0 5px 15px rgba(0, 0, 0, 0.4)`);
	document.documentElement.style.setProperty('--color-brand-antrika-attach-file', darkThemeColors.attachFile);
	document.documentElement.style.setProperty('--color-brand-antrika-crate-post-right', darkThemeColors.postRight);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-suggested-like', darkThemeColors.suggestedLike);
	document.documentElement.style.setProperty('--color-brand-antrika-roadmap-suggested-like-border', darkThemeColors.suggestedLikeBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-stats-count', darkThemeColors.count);
	document.documentElement.style.setProperty('--color-brand-antrika-login-card', darkThemeColors.loginCard);
	document.documentElement.style.setProperty('--color-brand-antrika-login-card-border', darkThemeColors.loginCardBr);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-search-result-bg', darkThemeColors.resultBg);
	document.documentElement.style.setProperty('--color-brand-antrika-feedback-search-result', darkThemeColors.secondaryText);
	document.documentElement.style.setProperty('--color-brand-nav-select', darkThemeColors.navSelect);
	document.documentElement.style.setProperty('--color-brand-nav-select-bg', darkThemeColors.selectBg);
	document.documentElement.style.setProperty('--color-brand-antrika-emoji-border', darkThemeColors.emojiBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-emoji-bg', darkThemeColors.emojiBg);
	document.documentElement.style.setProperty('--color-brand-antrika-select-border', darkThemeColors.selectBorder);
	document.documentElement.style.setProperty('--color-brand-antrika-unselect-board', darkThemeColors.feedbackBoard);
	document.documentElement.style.setProperty('--color-brand-antrika-explore-bg', '#FFFAF5');
	document.documentElement.style.setProperty('--color-brand-antrika-modal-overlay-bg', darkThemeColors.overlayBg);
	document.documentElement.style.setProperty('--color-brand-antrika-cancel-btn', darkThemeColors.background);
}