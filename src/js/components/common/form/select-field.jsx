
import React, { useRef } from 'react';
import Icon, { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
import Form from 'antd/es/form';
import Select from 'antd/es/select';
import Divider from 'antd/es/divider';
import { useField } from 'react-final-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { composeInputHandlers } from '../../../utils/input-util';
import defaultThumb from '../../../../img/default-employee.png';
import DesignationIcon from '../../../../icons/designation-icon';
import { useCurrentUser } from '../../../hooks';
import RefreshIcon from '../../../../icons/refresh-icon';
import TooltipHelp from '../tooltip-help';
import Spinner from '../spinner';
import ExternalLinkIcon from '../../../../icons/external-link-icon';
import { isFunction } from '../../../utils/type-util';

import style from './select-field.scss';

function SelectField({ name, data, keyField, textField, className, customDropdownRender, optionStyle, validate, addable, onAdd, onRefresh, mode, type, imgClassName, dotClassName, onChange, disabled, prefix, hideValueOnLoading, loading, addText, optionsWithProfile, avoidContainer, noDataIcon, noDataMsg, prefixIconStyle = {}, subValueClassName, textClassName, ...rest }) {

	const user = useCurrentUser();
	let { input, meta } = useField(name, { validate, allowNull: true });
	let handlers = composeInputHandlers(input, rest);
	let validateStatus = meta.touched && meta.error ? 'error' : '';
	let help = meta.touched ? meta.error : '';
	const ref = useRef();

	function onChangeCalled(e, sList) {
		if (mode === 'tags' && type === 'number' && onChange) {
			e = e.filter(v => !isNaN(Number(v)));
			input.onChange(e);
			onChange(e, sList);
		} else if (onChange) {
			input.onChange(e);
			onChange(e, sList);
		} else {
			input.onChange(e);
		}
	}

	const NotFoundContent = () => {
		if (loading) {
			return (
				<div className={style['spin-div']}>
					<Spinner />
				</div>
			);
		} else {
			return (
				<>
					<div className={style['no-data-div']}>
						{
							noDataIcon &&
				<img src={noDataIcon} />
						}
						<div>{noDataMsg || ((user.locale?.['no_records_found'] || 'No Records Found') + '!')}</div>
					</div>
				</>);
		}
	};

	return (
		(<Form.Item
			className={className}
			validateStatus={validateStatus}
			help={help} >
			{/* <div ref={ref} style={{ padding: '1px 0 1.1px' }}> */}
			<div ref={ref}>
				{prefix &&
					<div className={style.prefixIcon}
						style={prefixIconStyle}>{prefix}</div>
				}
				<Select
					mode={mode}
					className={style['select-component']}
					getPopupContainer={() => avoidContainer ? document.body : ref.current}
					popupClassName={classNames(style['select-field'], optionsWithProfile ? style['select-field-with-profile'] : '')}
					suffixIcon={<CaretDownOutlined />}
					{...input}
					{...rest}
					{...handlers}
					onChange={onChangeCalled}
					notFoundContent={<NotFoundContent />}
					loading={loading}
					value={(hideValueOnLoading && loading) ? undefined : ((data && input.value) || undefined)}
					filterOption={(input, option) => {
						if (option?.props?.title) {
							return option.props.title.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						}
						if (option?.props?.children?.toLowerCase?.().indexOf) {
							return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
						} else {
							return true;
						}
					}}
					disabled={!!disabled}
					dropdownRender={menu => customDropdownRender ? customDropdownRender(menu) : (
						<div>
							{menu}
							{addable &&
								<>
									<Divider style={{ margin: '4px 0 0' }} />
									<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
										<div
											style={{ padding: '6px 8px', cursor: 'pointer', width: isFunction(onRefresh) ? 'calc(100% - 40px)' : '100%' }}
											onMouseDown={e => e.preventDefault()}
											onClick={onAdd}
										>
											{
												!!addText && addText
											}
											{
												!addText &&
												<>
													<PlusOutlined className='link-color' />
													<span style={{ paddingLeft: '5px', verticalAlign: 'bottom' }} className='link-color'>Add New</span>
												</>
											}
										</div>
										<div>
											{
												isFunction(onRefresh) &&
												<TooltipHelp helpText='Refresh' >
													<Icon component={RefreshIcon} className={style['refresh-icon']} onMouseDown={e => e.preventDefault()} onClick={onRefresh} />
												</TooltipHelp>
											}
										</div>
									</div>
								</>
							}
						</div>
					)}
				>
					{
						data && data.map(el => {
							if (el) {
								if (optionsWithProfile) {
									return (
										<Select.Option key={keyField ? el[keyField] : el} title={textField ? el[textField] : el.name}>
											<div className={style['asset-div']}>
												<div className={style['asset-icon-div']}>
													<img src={el.thumb || defaultThumb} className={classNames(style['asset-icon'], imgClassName)} />
													<div className={classNames(style['asset-active-status-div'], dotClassName)}>
														<div className={style['asset-active-status']} style={{ backgroundColor: el.activeCc || '#5eb3fd' }} />
													</div>
												</div>
												<div className={classNames(optionStyle)} style={{ width: '100%' }}>
													<div className={classNames('semibold font-14', textClassName)}>{textField ? el[textField] : el.name}</div>
													{
														el.designation &&
														<div className={style['designation-div']}>
															<Icon component={DesignationIcon} className={style['designation-icon']} />
															<div className={style['designation-subtitles']}>{el.designation}</div>
														</div>
													}
													{
														el?.subValue &&
														<div className={subValueClassName}>{el.subValue}</div>
													}
													{
														el?.text &&
														<div className={subValueClassName}>{el.text}</div>
													}
													{
														el?.label &&
														<div className={subValueClassName}>{el.label}</div>
													}
												</div>
											</div>
										</Select.Option>
									);
								} else {
									return (
										<Select.Option key={keyField ? el[keyField] : el} title={textField ? el[textField] : el} disabled={el.disabled}>
											{textField ? <div className={style['show-option']}>
												<span className={el?.redirectUrl ? style['text-option'] : style['select-text-div']}>{el[textField]}</span>
												{el?.redirectUrl && <span onClick={() => window.open(el?.redirectUrl, '_blank')}>{<Icon component={ExternalLinkIcon} className={style['option-icon']} />}</span>}
											</div> : el}
										</Select.Option>
									);
								}
							}
						})
					}
				</Select>
			</div>
		</Form.Item>)
	);
}

/**
 * See the link below for a full list of props for Select.
 * @link https://ant.design/components/select/#API
 */
SelectField.Option = Select.Option;

SelectField.defaultProps = {
	loading: false
};

SelectField.propTypes = {
	name: PropTypes.string.isRequired,
	data: PropTypes.array,
	keyField: PropTypes.string,
	textField: PropTypes.string,
	className: PropTypes.string,
	subValueClassName: PropTypes.string,
	imgClassName: PropTypes.string,
	dotClassName: style.string,
	validate: PropTypes.func,
	onChange: PropTypes.func,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	addable: PropTypes.bool,
	onAdd: PropTypes.func,
	disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
	prefix: PropTypes.object,
	prefixIconStyle: PropTypes.object,
	mode: PropTypes.string,
	type: PropTypes.string,
	hideValueOnLoading: PropTypes.bool,
	loading: PropTypes.bool,
	addText: PropTypes.any,
	optionsWithProfile: PropTypes.bool,
	avoidContainer: PropTypes.bool,
	customDropdownRender: PropTypes.func,
	noDataIcon: PropTypes.string,
	noDataMsg: PropTypes.string,
	onRefresh: PropTypes.func,
	textClassName: PropTypes.string,
	optionStyle: PropTypes.string
};

export default SelectField;
