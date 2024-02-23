
export default {

	// Config URL's
	configUrl: '/configV2',
	configEmpCustomerUrl: '/config',
	configEmpUrl: '/config',

	// Host URL's
	hostUrl: '/host/info',

	// Captcha refresh
	captchaRefresh: 'captcha/refresh',

	// Login URL's
	login: 'login',
	emailValidation: 'signup/verify/email',
	otpValidation: 'signup/verify/otp',

	// Geo URL's
	geos: 'geo/list',
	geoCreate: 'geo/create',
	geoDelete: 'geo/delete',
	geoGet: 'geo/get',
	geoUpdate: 'geo/update',
	forget: 'forget_password',

	// account info customer
	accoutInfo: 'info',

	// account info emp
	get: 'get',

	// Employee Tasks URL's
	tasks: 'task/list',
	taskCreate: 'task/create',
	taskGet: 'task/get',
	taskDelete: 'emp/task/delete',
	taskDetail: 'task/detail',
	tasksUpdate: 'task/update',
	tasksUpload: 'task/upload',
	taskDownload: 'task/detail/pdf/download',
	tasksFormFieldUpdate: 'task/form/data/update',
	taskAuditHistory: 'task/audit/history',
	taskStageAuditHistory: 'emp/task/history',
	taskStageUpdate: 'emp/task/stage/update',

	// Employee Forms URL's
	forms: 'emp/form/list',
	formCreate: 'emp/form/create',
	formUpdateStatus: 'emp/form/update/status',
	formGet: 'emp/form/get',
	formDelete: 'emp/form/delete',
	formSearchList: 'order/form/search/list',
	saveOrderNote: 'order/notes',
	formInit: 'emp/form/init',
	formFieldUpdate: 'emp/form/field/update',
	formFieldFormsSearchList: 'emp/form/list/for/field',
	formFieldDisable: 'emp/form/field/disable',
	formFieldUpdateV2: 'emp/form/field/updateV2',

	// Employee Expenses URL's
	expenses: 'expense/list',
	expenseGet: 'expense/get',
	expenseUpdate: 'expense/update',
	expenseStatusUpdate: 'expense/status/update',
	expenseStageUpdate: 'expense/stage/update',

	// / Places URL's///
	places: 'place/list',
	placeCreate: 'place/create',
	placeDelete: 'place/delete',
	placeUpdateUrl: 'place/update',
	placeGet: 'place/get',
	placeAddress: 'get/address',

	// Asset Urls
	assetList: 'asset/list',
	assetTitles: 'asset/titles',
	vehicleSpec: 'vehicle/specs',
	assetCreate: 'asset/create',
	assetGet: 'asset',
	assetTimelineGet: 'asset/timeline',
	assetPositions: 'positions',
	assetUpdate: 'asset/update',
	assetDelete: 'asset/delete',
	assetTrackers: 'asset/trackers',
	assetAttach: 'asset/attach',
	assetDetach: 'asset/deattach',
	assetShare: 'asset/share/update',
	geoAttach: 'geo/attach',
	geoDetach: 'geo/deattach',
	assetImmobilize: 'command',
	assetReverse: 'reverse',
	assetListByCreateDate: 'asset/list/by/date',
	assetDownloadMultiGatePass: 'asset/gatepass/download',
	vehicleCalibrate: 'asset/calibrate',
	assetEmployees: 'asset/employees',
	assetRouteGet: 'asset/route/get',
	assetUnlock: 'asset/unlock/login',
	assetUpload: 'asset/upload',
	assetAdvanceFeature: 'employee/features/get',
	assetAdvanceFeatureFilter: 'employee/features/update',

	// Asset Group Urls
	assetGroupList: 'asset/group/list',
	assetGroupCreate: 'asset/group/create',
	assetGroupUpdate: 'asset/group/update',
	assetGroupGet: 'asset/group/get',

	// Setting Urls
	updateProfile: 'update_profile',
	updatePassword: 'update_password',
	updateSetting: 'update_settings',
	getStoppage: 'getStoppage',
	listStoppage: 'listStoppage',
	updateStoppage: 'updateStoppage',

	// Logout Urls
	logout: 'logout',

	// Routes Urls
	routeList: 'route/list',
	routeGet: 'route/get',
	routeCreate: 'route/create',
	routeUpdate: 'route/update',
	routeAssetList: 'route/asset/search/list',
	routeAssetAttach: 'route/asset/attach',
	routeAssetDetach: 'route/asset/dettach',
	routeUserList: 'route/user/list',
	routeUserSearch: 'route/user/search/list',
	routeUserAttach: 'route/user/add/remove',
	routeStopageUserSearch: 'route/stoppage/user/search/list',
	routeStoppageUserAttach: 'route/stoppage/user/add/remove',

	// User Urls
	userList: 'user/list',
	userGet: 'user/get',
	userCreate: 'user/add',
	userEmail: 'user/find',
	userUpdate: 'user/update',
	userDetele: 'user/delete',
	userRoles: 'user/role/list',

	// Device URL'S
	deviceList: 'device/list',
	deviceGet: 'device/details',
	deviceUpdate: 'device/title/update',

	// Fuel Setting
	getfuelRate: 'fuel/rate/setting/get',
	updatefuelRate: 'fuel/rate/setting/update',

	// Feedback URl's
	feedback: 'feedback',

	// / Summary
	summary: 'reportv2',

	// / Alerts URl
	alerts: '/alert/list',

	// / Trips URl
	trips: 'trips',
	tripPlayback: 'positions',

	// Employee Feeds URL's
	feeds: 'emp/feed/list',

	// Employee Attendance Urls
	empAttendanceList: 'emp/attendance/list',
	empAttendanceUpdate: 'emp/attendance/update',
	empAttendanceGet: 'emp/attendance/details',
	empAddAttendance: 'emp/punch',
	empForcePunchedOut: 'employee/force/punch/out',

	// Employee Leave Urls
	empLeaveRequests: 'emp/leave/list',
	empLeaveRequestUpdate: 'emp/leave/update',
	empLeaveRequestGet: 'emp/leave/details',

	// Insight
	insight: 'insights',
	empInsight: 'emp/insights',
	empInsightV2: 'emp/insightsV2',
	customerBillingInsight: 'emp/customer/billing/insights',
	empSettingGeneral: 'emp/settings/get',
	empSettingGeneralUpdate: 'emp/settings/update',
	empSettingLeaveList: 'emp/settings/leave/list',
	empSettingLeaveSummary: 'emp/leave/summary',
	empSettingLeaveDelete: 'emp/settings/leavetype/delete',
	empSettingLeaveCreate: 'emp/settings/leavetype/create',
	empSettingLeaveUpdate: 'emp/settings/leavetype/update',
	empSettingHolidayDelete: 'emp/settings/holiday/delete',
	empSettingHolidayGet: 'emp/settings/leave/get',
	empSettingHolidayCreate: 'emp/settings/holiday/create',
	empSettingHolidayUpdate: 'emp/settings/holiday/update',
	empSettingNonWorkingDays: 'emp/settings/nonworking/list',
	empSettingNonWorkingDaysDelete: 'emp/settings/nonworking/delete',
	empSettingNonWorkingDaysCreate: 'emp/settings/nonworking/create',
	empSettingNonWorkingDaysUpdate: 'emp/settings/nonworking/update',
	empSettingNonWorkingDaysGet: 'emp/settings/nonworking/get',
	empSettingTagList: 'tag/list',
	empSettingTagSearchList: 'tag/search/listV2',
	empSettingTagGet: 'tag/get',
	empSettingTagCreate: 'tag/create',
	empSettingTagUpdate: 'tag/update',
	expensePaymentType: 'expense/payment/type/list',
	empProductList: 'emp/product/list',
	empProductGet: 'emp/product/get',
	empProductCreate: 'emp/product/create',
	empProductUpdate: 'emp/product/update',
	empProductStatusUpdate: 'emp/product/status/update',
	empProductSearchList: 'emp/product/search/list',
	empOrderList: 'order/list',
	empOrderCreate: 'order/create',
	empStageList: 'fetch/orders/by/form',
	empStageOrderList: 'fetch/orders/by/stage',
	empOrderGet: 'order/get',
	empOrderUpdate: 'order/update',
	empOrderStageUpdate: 'order/update/stage',
	empTrack: 'emp/tracks',
	tagListByType: 'tag/list/by/type',

	// Employee Forms URL's
	reportConfig: 'report/config',
	reportConfigV2: 'report/configV2',
	reportFilter: 'report/filter',
	reportCreate: 'report/create',
	reportList: 'report/list',
	reportDelete: 'report/delete',
	reportGet: 'report/get',
	reportDetail: 'report/detail',
	reportUpdate: 'report/update',
	reportExport: 'report/detail/export',
	reportRun: 'report/run',
	reportTemplateExport: 'report/run/export',

	// Asset Share
	assetShareCheck: 'asset/share/check',
	assetShareLive: 'asset/share/live',

	// / Chat URL's///
	chatHistory: 'chat/history',
	chatContacts: 'chat/list',
	chatDetails: 'chat/details',
	chatMsgSend: 'chat/msg/send',

	// Employee WorkFlow
	empWorkflow: 'emp/workflow/list',
	empWorkflowCreate: 'emp/workflow/create',
	empWorkflowUpdate: 'emp/workflow/update',
	empWorkflowGet: 'emp/workflow/get',
	empWorkflowStageAdd: 'emp/workflow/stage/add',
	empWorkflowStageSwap: 'emp/workflow/stage/swap',
	empWorkflowStageDelete: 'emp/workflow/stage/delete',
	empWorkflowStageUpdate: 'emp/workflow/stage/update',
	empWorkflowAttach: 'emp/order/form/attach/workflow',
	empWorkflowSearchList: 'emp/workflow/search/list',

	// Expense Group List
	empExpenseGroupList: 'emp/expense/group/list',
	empExpenseGroupSearchList: 'emp/expense/group/search',

	// Employee Workflow V2
	empWorkflowV2: 'emp/workflowv2/list',
	empWorkflowV2Create: 'emp/workflowv2/create',
	empWorkflowV2Update: 'emp/workflowv2/update',
	empWorkflowV2Get: 'emp/workflowv2/get',
	empWorkflowV2StageAdd: 'emp/workflowv2/stage/add',
	empWorkflowV2StageDelete: 'emp/workflowv2/stage/delete',
	empWorkflowV2StageUpdate: 'emp/workflowv2/stage/update',
	empWorkflowV2Attach: 'emp/order/form/attach/workflowv2',
	empWorkflowV2SearchList: 'emp/workflowv2/search/list',
	empWorkflowV2StagesList: 'workflow/stages',
	empWorkflowV2FilterStages: 'workflowv2/filter/stages',

	// Employee Customer
	empCustomerCreate: 'emp/customer/create',
	empCustomerList: 'emp/customer/list',
	empCustomerListV2: 'emp/customer/listV2',
	empCustomerSearchList: 'emp/customer/search/list',
	empCustomerRoleList: 'emp/customer/role/list',
	empServiceTypeCustomers: 'service/request/customers',
	empCustomerGet: 'emp/customer/get',
	empCustomerUpdate: 'emp/customer/update',
	empCustomerUpdateStatus: 'emp/customer/update/status',
	empCustomerNotes: 'emp/customer/notes',
	empCustomerNotesGet: 'emp/customer/notes/get',
	empCustomerNotesAdd: 'emp/customer/notes/create',
	empCustomerNotesDelete: 'emp/customer/notes/delete',
	empCustomerHistory: 'emp/customer/history',
	empCustomerUpload: 'emp/customer/upload',

	// Employee Customer User
	empCustomerUserFind: 'emp/customer/user/find',
	empCustomerUserAdd: 'emp/customer/user/add',
	empCustomerUserList: 'emp/customer/user/list',
	empCustomerUserGet: 'emp/customer/user/get',
	empCustomerUserUpdate: 'emp/customer/user/update',
	empCustomerUserDetele: 'emp/customer/user/delete',
	empCustomerFlatList: 'emp/customer/flat/list',

	// Employee Customer
	serviceRequestCreate: 'service/request/create',
	serviceRequestList: 'service/request/listV2',
	serviceRequestGet: 'service/request/get',
	serviceRequestReassign: 'service/request/reassign',
	serviceRequestUpdatePriority: 'service/request/update/priority',
	serviceRequestUpdate: 'service/request/update',
	saveServiceRequestNote: 'service/request/notes',
	saveEmpServiceRequestNote: 'emp/service/request/notes',
	serviceRequestStageUpdate: 'service/request/update/stage',

	// Employee Broadcast
	broadcastCreate: 'broadcast/create',
	broadcastList: 'broadcast/list',
	broadcastInit: 'broadcast/init',
	broadcastGet: 'broadcast/get',
	broadcastDelete: 'broadcast/delete',
	broadcastUpdate: 'broadcast/update',
	broadcastMsgSend: 'broadcast/msg/send',
	broadcastMsgDetails: 'broadcast/msg/list',
	broadcastMsgDelete: 'broadcast/msg/delete',

	// Domestic Type
	domesticTypeList: 'domestic/type/list',
	domesticTypeCreate: 'domestic/type/create',
	domesticTypeGet: 'domestic/type/get',
	domesticTypeUpdate: 'domestic/type/update',
	domesticTypeSearchList: 'domestic/type/search/list',

	// Domestic Worker
	domesticWorkerList: 'domestic/help/list',
	domesticWorkerCreate: 'domestic/help/create',
	domesticWorkerGet: 'domestic/help/get',
	domesticWorkerUpdate: 'domestic/help/update',
	domesticWorkerAttachByCustomer: 'domestic/help/customer/attach',
	domesticWorkerDetachByCustomer: 'domestic/help/customer/detach',
	domesticWorkerAttachedCustomer: 'domestic/help/customer/list',
	domesticWorkerGatePassList: 'domestic/help/gatepass/list',
	domesticWorkerGatePass: 'domestic/help/gatepass/get',
	domesticWorkerGetByGatePassId: 'domestic/help/detail/by/gatepass/id',
	domesticWorkerGetByQRCode: 'domestic/help/entry/by/qr',
	domesticWorkerAttendanceList: 'domestic/help/attendance/list',
	domesticWorkerAttendanceGet: 'domestic/help/attendance/get',
	domesticWorkerReviewList: 'domestic/help/review/listV2',
	domesticWorkerGetReview: 'domestic/help/review/get',
	domesticWorkerHistoryList: 'domestic/help/working/history/list',
	domesticWorkerGetHistory: 'domestic/help/working/history/get',
	domesticWorkerExportGatePass: 'domestic/help/gatepass',
	domesticWorkerGenerateGatePass: 'domestic/help/issue/gatepass',
	domesticWorkerEntryExit: 'domestic/help/entry',
	domesticWorkerAttachedCustomerSearchList: 'domestic/help/attached/customers',
	domesticWorkerSelectGatePass: 'domestic/help/gatepass/list/by/date',
	domesticWorkerPrintMultiGatePass: 'domestic/help/download/multiple/gatepass',

	// Document Type
	documentTypeList: 'document/type/list',
	documentTypeCreate: 'document/type/create',
	documentTypeGet: 'document/type/get',
	documentTypeUpdate: 'document/type/update',
	documentTypeSearchList: 'document/type/search/list',

	// Domestic Type
	domesticDocumentList: 'domestic/help/document/list',
	domesticDocumentCreate: 'domestic/help/document/upload',
	domesticDocumentUpdate: 'domestic/help/document/update',
	domesticDocumentGet: 'domestic/help/document/get',

	// Customer SignUp Requests
	customerSignRequestList: 'signup/request/list',
	customerSignRequestGet: 'signup/request/get',
	customerSignRequestApprove: 'signup/request/approve',

	// Web data
	webData: 'emp/customer/getWebBill',
	customerBilling: 'emp/customer/bill',

	// Visitor Type
	visitorTypeList: 'visitor/type/list',
	visitorTypeCreate: 'visitor/type/create',
	visitorTypeGet: 'visitor/type/get',
	visitorTypeUpdate: 'visitor/type/update',
	visitorTypeSearchList: 'visitor/type/search/list',
	visitorTypeFilterList: 'visitor/type/filter/list',
	visitorCompanySearch: 'visitor/company/list',

	// Visitor
	visitorList: 'visitor/list',
	visitorOutList: 'visitor/out/list',
	visitorInList: 'visitor/in/list',
	visitorSearchAndCreate: 'visitor/find/or/create',
	visitorUpdateStatus: 'visitor/status/update',
	visitorRequest: 'visitor/request',
	visitorGet: 'visitor/get',
	billingInsights: 'emp/customer/billing/insights',

	// Employee Advance payment
	empAdvancePaymentList: 'expense/advance/payment/list',
	empAdvancePaymentSearchList: 'expense/payment/type/search/list',
	empAdvancePaymentAdd: 'expense/advance/payment/add',
	empAdvancePaymentGet: 'expense/advance/payment/get',
	empAdvancePaymentUpdate: 'expense/advance/payment/update',
	expPaymentTypeCreate: 'expense/payment/type/create',
	expPaymentTypeUpdate: 'expense/payment/type/update',
	expPaymentTypeGet: 'expense/payment/type/get',
	empShiftAdd: 'emp/shift/add',
	empShiftUpdate: 'emp/shift/update',
	empShiftList: 'emp/shift/list',
	empShiftGet: 'emp/shift/get',
	empShiftSearchList: 'emp/shift/search/list',
	empLeaveProfileList: 'emp/leave/profile/list',
	empLeaveProfileAdd: 'emp/leave/profile/add',
	empLeaveProfileUpdate: 'emp/leave/profile/update',
	empLeaveProfileSearchList: 'emp/leave/profile/search/list',

	// Account Setting
	accountSettingDetail: 'account/setting/detail',
	accountSettingUpdate: 'account/setting/update',
	formFieldOrderUpdate: 'emp/form/field/update/order',

	// Employee Customer
	vehicleDriverCreate: 'driver/create',
	vehicleDriverListV2: 'driver/list',
	vehicleDriverGet: 'driver/get',
	vehicleDriverUpdate: 'driver/update',
	vehicleDriverSearch: 'driver/search/list',
	vehicleDriverAttach: 'driver/attach',
	vehicleDriverDettach: 'driver/dettach',

	// Document Upload
	employeeDocumentCreate: 'employee/document/upload',
	employeeDocumentList: 'employee/document/list',
	employeeDocumentGet: 'employee/document/get',
	employeeDocumentUpdate: 'employee/document/update',
	vehicleDocumentCreate: 'vehicle/document/upload',
	vehicleDocumentList: 'vehicle/document/list',
	vehicleDocumentGet: 'vehicle/document/get',
	vehicleDocumentUpdate: 'vehicle/document/update',
	empCustomerDocumentCreate: 'emp/customer/document/upload',
	empCustomerDocumentList: 'emp/customer/document/list',
	empCustomerDocumentGet: 'emp/customer/document/get',
	empCustomerDocumentUpdate: 'emp/customer/document/update',
	assetDocumentCreate: 'asset/document/upload',
	assetDocumentList: 'asset/document/list',
	assetDocumentGet: 'asset/document/get',
	assetDocumentUpdate: 'asset/document/update',
	empEntityGet: 'emp/entity/data/get',
	empEntitySave: 'emp/entity/data/upload',
	empEntityUpdate: 'emp/entity/data/update',

	// Indoor Insight
	indoorInsight: 'indoor/tracking/insights',

	// Premise URL's
	premises: 'premise/list',
	premiseCreate: 'premise/create',
	premiseDelete: 'premise/delete',
	premiseGet: 'premise/get',
	premiseUpdate: 'premise/update',
	premiseSearch: 'premise/keys',

	// Floor URL's
	floors: 'floor/list',
	floorCreate: 'floor/create',
	floorGet: 'floor/get',
	floorUpdate: 'floor/update',
	floorSearch: 'floor/keys',

	// Receiver URL's
	receiver: 'receiver/list',
	receiverCreate: 'receiver/create',
	receiverDelete: 'receiver/delete',
	receiverGet: 'receiver/get',
	receiverUpdate: 'receiver/update',

	// Student Leave
	studentLeaveList: 'leave/list',
	studentLeaveCreate: 'leave/create',
	studentLeaveGet: 'leave/get',
	studentLeaveUpdate: 'leave/update',

	// Emp Leads
	empLeadsList: 'emp/leads/list',
	empLeadsCreate: 'emp/leads/create',
	empLeadsUpdate: 'emp/leads/update',
	empLeadsGet: 'emp/leads/get',
	empLeadsHistory: 'emp/leads/history',
	empLeadsDocumentCreate: 'emp/leads/document/upload',
	empLeadsDocumentList: 'emp/leads/document/list',
	empLeadsDocumentGet: 'emp/leads/document/get',
	empLeadsDocumentUpdate: 'emp/leads/document/update',
	empLeadsStageUpdate: 'emp/leads/stage/update',
	// empLeadsSourceSearchList: 'emp/leads/source/search/list',
	empLeadsContactList: 'emp/lead/contact/list',
	empLeadsContactAdd: 'emp/lead/contact/add',
	empLeadsContactUpdate: 'emp/lead/contact/update',
	empLeadsContactGet: 'emp/lead/contact/get',
	empLeadsSourceList: 'emp/leads/source/list',
	empLeadsSourceCreate: 'emp/leads/source/create',
	empLeadsSourceGet: 'emp/leads/source/get',
	empLeadsSourceUpdate: 'emp/leads/source/update',

	// bulk upload
	empBulkUploadList: 'upload/excel/list',
	empBulkUpload: 'upload/excel',

	// Role
	trackwickRoleList: 'emp/customer/role/list',

	// OTP URl
	trackwickOtpSend: 'send/otp',
	trackwickOtpResend: 'resend/otp',

	// logout
	trackwickLogout: 'trackwick/logout',

	// punch
	trackwickAttendancePunch: 'punch',

	// Settings
	trackwickUpdatePassword: 'password/update',
	trackwickUpdateProfile: 'profile/update',
	trackwickUpdateSetting: 'settings/update',
	trackwickAttendanceList: 'attendance/list/web',
	trackwickPunchIn: 'get',

	// BroadCast
	trackwickBroadcastList: 'emp/broadcast/list',
	trackwickBroadcastMsgs: 'emp/broadcast/msg/list',

	// / Chat URL's///
	trackwickChatHistory: 'emp/chat/history',
	trackwickChatContacts: 'emp/chat/list',
	trackwickChatDetails: 'emp/chat/details',
	trackwickChatMsgSend: 'emp/chat/msg/send',

	// Track
	trackwickPlayback: 'asset/positions',
	trackwickPosition: 'emp/positions',

	// Task
	trackwickTaskList: 'task/list/web',
	trackwickTaskDetails: 'emp/task/detail',
	trackwickTaskStart: 'emp/task/start',
	trackwickTaskComplete: 'emp/task/submit',
	trackwickTaskCreate: 'emp/task/create',
	trackwickTaskCreateComplete: 'emp/task/create/submit',
	trackwickTaskCreateStart: 'emp/task/create/start',

	// Expense
	trackwickExpenseList: 'expense/list/web',
	trackwickExpenseGet: 'emp/expense/get',
	trackwickExpenseCreate: 'emp/expense/create',
	trackwickExpenseUpdate: 'emp/expense/update',

	// Expense Group
	trackwickExpenseGroupCreate: 'emp/expense/group/create',
	trackwickExpenseGroupSearch: 'emp/expense/group/search/list',

	// Manpower
	trackwickCustomerList: 'customer/list/web',
	trackwickManpowerLeaveApply: 'emp/manpower/leave/apply',
	trackwickManpowerLeaveList: 'emp/manpower/leave/list',
	trackwickManpowerAttendance: 'emp/manpower/attendance/list',

	// Manpower
	trackwickManpowerList: 'emp/manpower/list',
	trackwickManpowerGet: 'emp/manpower/details',
	trackwickManpowerUpdate: 'emp/manpower/update',

	// Leave
	trackwickLeaveHistory: 'leave/list',
	trackwickLeaveSummary: 'leave/details',
	trackwickLeaveApply: 'leave/apply',
	trackwickLeaveCancel: 'leave/update',

	// Forms
	trackwickFormSearch: 'form/list',
	trackwickFormGet: 'form/get',

	// Places
	trackwickPlacesSearch: 'emp/place/list',
	trackwickPlaceCreate: 'manager/place/create',

	// Currency
	trackwickCurrencySearch: 'currency',

	// customer
	trackwickCustomerSearch: 'emp/service/request/search/customer',

	// Ticket
	trackwickTicketList: 'emp/service/request/list',
	trackwickTicketGet: 'emp/service/request/get',
	trackwickTicketUpdate: 'emp/service/request/update',
	trackwickTicketUpdateStage: 'emp/service/request/update/stage',

	// Product
	trackwickProductSearch: 'emp/order/product/search/list',

	// Order
	trackwickOrderList: 'emp/order/list',
	trackwickOrderGet: 'emp/order/get',
	trackwickOrderUpdate: 'emp/order/update',
	trackwickOrderCreate: 'emp/order/create',

	// Team
	trackwickTeamEmpList: 'manager/emp/list/web',
	trackwickTeamTaskList: 'manager/emp/task/list/web',
	trackwickTeamTaskCreate: 'manager/task/create',
	trackwickTeamTaskGet: 'manager/task/get',
	trackwickTeamTaskUpdate: 'manager/task/update',
	trackwickTeamExpenseList: 'manager/emp/expense/list/web',
	expenseTeamGet: 'manager/expense/get',
	expenseTeamUpdate: 'manager/expense/update',
	expenseTeamStatusUpdate: 'expense/status/update',
	trackwickTeamEmpSearch: 'manager/employee/list',

	// Employee Get
	trackwickEmpGet: 'emp/get',
	trackwickEmpAttendances: 'emp/manpower/attendance/list',
	trackwickEmpLeave: 'emp/manpower/leave/list',
	trackwickEmpLeaveSummary: 'leave/details',

	// Note
	trackwickCustomerNotes: 'emp/customer/notes/web/list',
	trackwickCustomerNoteAdd: 'emp/customer/notes/create',
	trackwickCustomerEmpNotes: 'emp/customer/notes/list',

	// / Holiday URL's///
	trackwickHolidays: 'holiday/get',

	// / Place URL's///
	trackwickPlaceSearch: 'get/address',

	// / Leads URL's///
	trackwickLeads: 'emp/leads/search/list',
	trackwickLeadSource: 'emp/leads/source/search/list'
};
