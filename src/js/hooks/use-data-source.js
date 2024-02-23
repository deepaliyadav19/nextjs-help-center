'use client'
import { useReducer, useState, useEffect } from 'react';
import Axios from 'axios';

import { isEnum } from '../utils/enum-util';
import { areObjectsEqual, isArray, isNotEmptyArray } from '../utils/type-util';
import { api } from '../api';

/**
 * Uses a data source for components that display a list of records with paging, sorting, and filtering.
 * Only used for generic pagination response of trackOlap.
 *
 * @param   {Object}   [props.dontCall]       Boolean to restrict the api call.
 * @param   {Object} props
 * @returns {{
 *     data: Object,
 *     total: Number,
 *     error: Object,
 *     loading: Boolean,
 *     query: { pagination: {
 * 					current: Number,
 * 					pageSize: Number,
 * 					showSizeChanger: Boolean,
 * 					pageSizeOptions: Array<Number>,
 * 					showTotal: (total: number, range: number) => String,
 * 					loadSize: Number,
 * 					isLoadMore: Boolean,
 *					isLoadMore: Boolean
 *     			},
 *     			filters: Object,
 * 				sorter: Object
 * 			},
 *     setQuery: function(*),
 *     selectedRowKeys: Array,
 *     setSelectedRowKeys: function(*),
 *     refresh: function(),
 *     loadMore: function(),
 *	   dontCall: Boolean,
 *     changeLoadSize: function(size).
 * }}
 */
export function useDataSource(props) {

	let { request, payload, schema, initialPageSize, initialTableFilters, initialCurrentPage, quickFilter, selectedQuickFilterId, tableDivWidth, dontCall = false } = props;
	function setInitialPagination() {
		return {
			current: initialCurrentPage || 1,
			pageSize: Number(initialPageSize || 25),
			showSizeChanger: true,
			pageSizeOptions: [],
			showTotal: function showTotal(total, range) {
				return ''.concat(range[0], ' - ').concat(range[1], ' of ').concat(total, ' items');
			},
			loadSize: Number(initialPageSize || 25),
			isLoadMore: false
		};
	}
	let initialState = {
		data: null,
		query: {
			pagination: setInitialPagination(),
			filters: initialTableFilters || {},
			quickFilter: quickFilter || null,
			selectedQuickFilterId: selectedQuickFilterId || null,
			sorter: {}
		},
		payload,
		total: 0,
		loading: false,
		selectedRowKeys: [],
		error: null
	};
	let [cacheBreaker, setCacheBreaker] = useState();
	let [state, dispatch] = useReducer(reducer, initialState);
	let { query } = state;

	useEffect(() => {
		if (initialState.query && !areObjectsEqual(query.filters, initialState.query.filters)) {
			dispatch({ query: { ...initialState.query } });
		}
	}, [JSON.stringify(initialTableFilters)]);

	useEffect(() => {
		if (dontCall) {
			dispatch({ error: null, data: (state.data || null), total: (state.total || null), loading: false });
		} else {
			let didCancel = false;
			dispatch({ loading: true });

			let { pagination } = query;

			if (!areObjectsEqual(state.payload, payload)) {
				pagination.current = 1;
				state.rowsBackup = [];
			}

			const { pageSize, current, isLoadMore, loadSize } = pagination;
			const number = (isLoadMore ? loadSize : pageSize);

			if (typeof (request) === 'string') {
				if (request.startsWith('https://run.mocky.io/')) {
					Axios.get(request)
						.then(response => {
							if (didCancel) {
								return;
							}
							let pageOptions = [];
							if (response.data.pagination) {
								for (var i in response.data.pageOptions) {
									pageOptions.push(i);
									// if (response.data.pageOptions[i]) {
									// 	query.pagination.pageSize = i;
									// 	query.pagination.loadSize = i;
									// }
								}
							} else {
								pageOptions = [10, 25, 50, 100];
							}
							// for (var i in response.data.pageOptions) {
							// 	pageOptions.push(i);
							// 	// if (response.data.pageOptions[i]) {
							// 	// 	query.pagination.pageSize = i;
							// 	// 	query.pagination.loadSize = i;
							// 	// }
							// }
							query.pagination.pageSizeOptions = pageOptions;

							let rows = [];
							let data = response.data;
							let dataWithBackup = false;
							if (isArray(data.rows)) {
								rows = data.rows;
								// if pagination option not found then rows need to be merge from state
								if (data.pagination) {
									query.pagination.isLoadMore = true;
									query.pagination.pageSize = query.pagination.loadSize * current;

									if (query.pagination.loadSize < data.count) {
										query.pagination.pageSize = data.count * current;
									}

									if (isNotEmptyArray(state.rowsBackup)) {
										rows = [...state.rowsBackup, ...response.data.rows];
										dataWithBackup = true;
									}
								}
							}

							data.rows = rows;
							const total = data.total || data.count || 0;
							dispatch({ data, total, error: null, loading: false, query, payload, dataWithBackup });
						})
						.catch(error => {
							dispatch({ error, data: null, total: 0, loading: false });
						});
				} else {
					api.callPostwithParams({
						url: request,
						params: payload.params,
						data: {
							pagination: {
								number,
								numberOfPages: 1,
								start: (current - 1) * number
							},
							width: tableDivWidth || window.screen.width,
							or: !!query.filters.toggleFilter,
							tableFilter: buildFilters(query.filters),
							filter: query.quickFilter,
							sort: formatSort(query.sorter, schema.fields),
							columns: payload.columns
						}
					})
						.then(response => {
							if (didCancel) {
								return;
							}
							let pageOptions = [];
							if (response.data.pagination) {
								for (var i in response.data.pageOptions) {
									pageOptions.push(i);
								// if (response.data.pageOptions[i]) {
								// 	query.pagination.pageSize = i;
								// 	query.pagination.loadSize = i;
								// }
								}
							} else {
								pageOptions = [10, 25, 50, 100];
							}
							// for (var i in response.data.pageOptions) {
							// 	pageOptions.push(i);
							// 	// if (response.data.pageOptions[i]) {
							// 	// 	query.pagination.pageSize = i;
							// 	// 	query.pagination.loadSize = i;
							// 	// }
							// }
							query.pagination.pageSizeOptions = pageOptions;

							let rows = [];
							let data = response.data;
							let dataWithBackup = false;
							if (isArray(data.rows)) {
								rows = data.rows;
								// if pagination option not found then rows need to be merge from state
								if (data.pagination) {
									query.pagination.isLoadMore = true;
									query.pagination.pageSize = query.pagination.loadSize * current;

									if (query.pagination.loadSize < data.count) {
										query.pagination.pageSize = data.count * current;
									}

									if (isNotEmptyArray(state.rowsBackup)) {
										rows = [...state.rowsBackup, ...response.data.rows];
										dataWithBackup = true;
									}
								}
							}

							data.rows = rows;
							const total = data.total || data.count || 0;
							dispatch({ data, total, error: null, loading: false, query, payload, dataWithBackup });
						})
						.catch(error => {
							dispatch({ error, data: null, total: 0, loading: false });
						});
				}
			} else {
				request({
					pagination: {
						number,
						numberOfPages: 1,
						start: (current - 1) * number
					},
					width: tableDivWidth || window.screen.width,
					or: !!query.filters.toggleFilter,
					tableFilter: buildFilters(query.filters),
					filter: query.quickFilter,
					sort: formatSort(query.sorter, schema.fields),
					...payload
				})
					.then(response => {
						if (didCancel) {
							return;
						}
						let pageOptions = [];
						if (response.data.pagination) {
							for (var i in response.data.pageOptions) {
								pageOptions.push(i);
							// if (response.data.pageOptions[i]) {
							// 	query.pagination.pageSize = i;
							// 	query.pagination.loadSize = i;
							// }
							}
						} else {
							pageOptions = [10, 25, 50, 100];
						}
						// for (var i in response.data.pageOptions) {
						// 	pageOptions.push(i);
						// 	// if (response.data.pageOptions[i]) {
						// 	// 	query.pagination.pageSize = i;
						// 	// 	query.pagination.loadSize = i;
						// 	// }
						// }
						query.pagination.pageSizeOptions = pageOptions;

						let rows = [];
						let dataWithBackup = false;
						let data = response.data;
						if (isArray(data.rows)) {

							rows = data.rows;
							// if pagination option not found then rows need to be merge from state
							if (data.pagination) {
								query.pagination.isLoadMore = true;
								query.pagination.pageSize = query.pagination.loadSize * current;
								if (isNotEmptyArray(state.rowsBackup)) {
									rows = [...state.rowsBackup, ...response.data.rows];
									dataWithBackup = true;
								}
							}
						}

						data.rows = rows;
						const total = data.total || data.count || 0;
						dispatch({ data, total, error: null, loading: false, query, payload, dataWithBackup });
					})
					.catch(error => {
						dispatch({ error, data: null, total: 0, loading: false });
					});
			}

			return () => {
				didCancel = true;
			};
		}
	}, [
		query,
		request,
		JSON.stringify(payload),
		cacheBreaker,
		dontCall
	]);

	let setQuery = (pagination, filters, sorter, quickFilter = null) => {

		if (isNaN(pagination.pageSize)) {
			pagination = setInitialPagination();
		}

		if (query.pagination.isLoadMore ||
			!areObjectsEqual(query.filters, filters) ||
			!areObjectsEqual(query.sorter, sorter) ||
			!areObjectsEqual(query.quickFilter, quickFilter)
		) {
			pagination.current = 1;
			pagination.pageSize = pagination.pageSize;
			// query.pagination.loadSize = pagination.pageSize;
		}
		dispatch({
			rowsBackup: [],
			query: { pagination, filters, sorter, quickFilter },
			selectedRowKeys: []
		});
	};

	let loadMore = () => {

		let { data: { hm, rows } } = state;
		if (!hm) {
			return;
		}
		query.pagination.current = query.pagination.current + 1;
		query.pagination.pageSize = query.pagination.current * query.pagination.loadSize;
		dispatch({ query: { ...query }, rowsBackup: rows });
	};

	let changeLoadSize = size => {

		let { query } = state;
		query.pagination.current = 1;
		query.pagination.pageSize = query.pagination.loadSize = size;
		dispatch({ query: { ...query }, rowsBackup: [] });
	};

	let setSelectedRowKeys = selectedRowKeys => dispatch({ selectedRowKeys });

	let refresh = () => setCacheBreaker(Date.now());

	return { ...state, setQuery, setSelectedRowKeys, refresh, loadMore, changeLoadSize };
}

/**
 * Formats a sort query to a comma separated string.
 *
 * @param   {Object} sorter
 * @param   {Object} fields
 * @returns {String || null}
 */

// export function buildQuickFilter(filters) {
// 	let map = { ...filters };
// 	let keys = Object.keys(map);
// 	for (var i in keys) {
// 		if (keys[i] === 'currentDataSource') {
// 			delete map[keys[i]];
// 		}
// 	}
// 	return map;
// }

export function formatSort(sorter, fields) {

	let { field: sortField, order } = sorter;

	if (sortField && fields) {
		let path = sortField.split('.');
		if (isEnum(fields[path[0]])) {
			sortField = path[0];
		}
	}

	// return sortField ? (sortField + ',' + order) : null;
	return (sortField && order) ? { predicate: sortField, reverse: order === 'ascend' } : {};
}

export function buildFilters(filters) {
	let map = {};
	for (var key in filters) {
		if (isNotEmptyArray(filters[key])) {
			map[key] = filters[key][0];
			let value = filters[key][0].value;
			let v;
			let title;
			// switch (filters[key][0].searchType) {
			// 	case 'DATE':
			// 	case 'DATE_TIME':
			// 		switch (filters[key][0].operation) {
			// 			case 'DATE_RANGE':
			// 				v = isNotEmptyObject(value && value.key) ? value.key[0]._d.getTime() + '-' + value.key[1]._d.getTime() : value.value;
			// 				break;
			// 			default:
			// 				v = isNotEmptyObject(value && value.key) ? moment(value.value).format('x') : value.value;
			// 				break;
			// 		}
			// 		break;
			// }
			if (filters[key][0].searchType !== 'DATE' && filters[key][0].searchType !== 'DATE_TIME') {
				if (filters[key][0].valueType === 'MULTIPLE' && filters[key][0].operation !== 'NOT_AVAILABLE') {
					v = [];
					title = [];
					value.map(item => {
						v.push(item.key);
						title.push(item.value);
					});
				} else {
					v = value?.key;
					title = value?.value;
				}
			}
			map[key] = {
				operation: filters[key][0].operation,
				searchType: filters[key][0].searchType,
				type: filters[key][0].type,
				valueType: filters[key][0].valueType,
				value: (filters[key][0].valueType === 'MULTIPLE' && filters[key][0].operation !== 'NOT_AVAILABLE') ? v.toString() : v,
				title: (filters[key][0].valueType === 'MULTIPLE' && filters[key][0].operation !== 'NOT_AVAILABLE') ? title.toString() : title
			};
			if (filters[key][0].fieldExist !== undefined && filters[key][0].fieldExist !== null) {
				map[key].fieldExist = filters[key][0].fieldExist;
			}
			if (filters[key][0].subType !== undefined && filters[key][0].subType !== null) {
				map[key].subType = filters[key][0].subType;
			}
		}
	}
	return map;
}

/**
 * Reducer for the data source state.
 *
 * @param   {Object} state
 * @param   {Object} action
 * @returns {Object}
 */
function reducer(state, action) {
	return { ...state, ...action };
}
