import React, { useState, useEffect } from 'react';
import Icon from '@ant-design/icons';
import { Menu, Select } from 'antd';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import { useContentWidth, useGridFilters } from '../../../../../../hooks';
import { isNotEmptyArray } from '../../../../../../utils/type-util';
import DashboardIcon from '../../../../../../../icons/dashboard-icon';
import DocumentIcon4 from '../../../../../../../icons/document-icon-4';

import style from './knowledgebase-sidebar.scss';

const { SubMenu } = Menu;

function KnowledgebaseSidebarLayout({ data, history, match, filterKey }) {
	const [selectedNav, setSelectedNav] = useState([]);
	const [filters, setFilters] = useGridFilters(filterKey);
	const clientWidth = useContentWidth();

	useEffect(() => {
		if (data.length > 0) {
			data.forEach(element => {
				if (history.location?.pathname.includes(element.key)) {
					if (element.data?.length > 0 && clientWidth > 769) {
						element.data.forEach(subElement => {
							if (history.location?.pathname.includes(subElement.slug)) {
								setSelectedNav([subElement.slug]);
							}
						});
					} else {
						setSelectedNav([element.key]);
					}
					setFilters({ ...filters, selectedCategory: element.value, selectedCategoryKey: element.key });
				}
			});
		}
	}, [data, history.location]);

	function changeMenu(e) {
		setSelectedNav([e.key]);
		setFilters({ ...filters, selectedCategory: e.value });
	}

	function selectChange(key) {
		setSelectedNav([key]);
		setFilters({ ...filters, selectedCategory: data.find(d => d.key === key).value });
		history.push('/' + match.params.kslug + '/' + key);
	}

	function buildMenuItem(menu) {
		if (!menu.data || menu.data.length === 0) {
			return (
				<Menu.Item key={menu.key} className={style['menu-content']} >
					<Icon component={DashboardIcon} className={style['menu-icon']} />
					<Link to={'/' + match.params.kslug + '/' + menu.id}>{menu.value}</Link>
				</Menu.Item>
			);
		} else {
			return (
				<SubMenu
					key={menu.key}
					title={
						<div style={{ lineHeight: 2.3 }}>
							<span>
								<Icon component={DocumentIcon4} style={{ color: '#000', fontSize: '14px', marginRight: '10px' }} />
							</span>
							<span>
								{menu.value}
							</span>
						</div>
					}>
					<Menu.ItemGroup>
						{menu.data.map(subMenu => (
							<Menu.Item key={subMenu.slug}>
								<div className={style['bullet-span']}>
									<div className={style['bullet-point']}>•</div>
									<Link
										title={subMenu.title}
										style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
										to={'/' + match.params.kslug + '/' + menu.key + '/' + subMenu.slug}
									>{subMenu.title}</Link>
								</div>
							</Menu.Item>
						))}
					</Menu.ItemGroup>
				</SubMenu>
			);
		}
	}

	function buildOptions() {
		let array = [];
		if (isNotEmptyArray(data)) {
			data.map(d =>
				array.push(<Select.Option id={d.key} value={d.key} key={d.key} title={d.value}>{d.value}</Select.Option>)
			);
		}
		return array;
	}

	return (
		<>
			<div
				className={classNames(style['menu-bar'])}>
				<div className={style['employee-menu']}>
					<Menu
						selectedKeys={selectedNav}
						defaultOpenKeys={filters?.selectedCategoryKey ? [filters.selectedCategoryKey] : null}
						mode='inline'
						onSelect={changeMenu}
					>
						{data.map(menu => {
							return buildMenuItem(menu);
						})}
					</Menu>
				</div>
			</div>
			<div className={classNames(style['dropdown-menu'])}>
				<Select value={selectedNav} style={{ width: '100%' }} onChange={selectChange}>
					{buildOptions()}
				</Select>
			</div>
		</>
	);
}

// function KnowledgebaseSidebarLayout({ data, history, match, filterKey }) {
// 	const [selectedNav, setSelectedNav] = useState([]);
// 	const [filters, setFilters] = useGridFilters(filterKey);
// 	useEffect(() => {
// 		if (data.length > 0) {
// 			data.forEach(element => {
// 				if (history.location?.pathname.includes(element.key)) {
// 					setSelectedNav([element.key]);
// 					setFilters({ ...filters, selectedCategory: element.value });
// 				}
// 			});
// 		}
// 	}, [data, history.location]);

// 	function changeMenu(e) {
// 		setSelectedNav([e.key]);
// 		setFilters({ ...filters, selectedCategory: e.value });
// 	}

// 	function selectChange(key) {
// 		setSelectedNav([key]);
// 		setFilters({ ...filters, selectedCategory: data.find(d => d.key === key).value });
// 		history.push('/' + match.params.kslug + '/' + key);
// 	}

// 	function buildMenuItem(menu) {
// 		return (
// 			<Menu.Item key={menu.key} className={style['menu-content']} >
// 				<Link to={'/' + match.params.kslug + '/' + menu.key}>{menu.value}</Link>
// 			</Menu.Item>
// 		);
// 	}

// 	function buildOptions() {
// 		let array = [];
// 		if (isNotEmptyArray(data)) {
// 			data.map(d =>
// 				array.push(<Select.Option id={d.key} value={d.key} key={d.key} title={d.value}>{d.value}</Select.Option>)
// 			);
// 		}
// 		return array;
// 	}

// 	return (
// 		<>
// 			<div
// 				className={classNames(style['menu-bar'])}>
// 				{
// 					<div className={style['employee-menu']}>
// 						<Menu selectedKeys={selectedNav} mode='inline' onSelect={changeMenu}>
// 							{data.map(menu => {
// 								return buildMenuItem(menu);
// 							})}
// 						</Menu>
// 					</div>
// 				}
// 			</div>
// 			<div className={classNames(style['dropdown-menu'])}>
// 				<Select value={selectedNav} style={{ width: '100%' }} onChange={selectChange}>
// 					{buildOptions()}
// 				</Select>
// 			</div>
// 		</>
// 	);
// }

export default KnowledgebaseSidebarLayout;
