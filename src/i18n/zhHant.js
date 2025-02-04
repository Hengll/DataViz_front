import { zhHant } from 'vuetify/locale'

export default {
  $vuetify: zhHant,
  nav: {
    home: '首頁',
    explore: '探索與推薦',
    tutorial: '教學',
    about: '關於我們',
    settings: '設定',
    login: '登入',
    register: '註冊',
    logout: '登出',
    myWorkSpace: '我的空間',
    myDashboards: '我的儀錶板',
    myDataSets: '我的資料集',
    linkData: '連結資料',
    editDashboard: '儀錶板編輯',
    previewDashboard: '儀錶板預覽',
    saveAndBack: '保存並返回',
  },
  login: {
    login: '登入',
    success: '登入成功',
  },
  register: {
    register: '註冊',
    success: '註冊成功',
  },
  logout: {
    success: '登出成功',
  },
  user: {
    account: '帳號',
    userName: '用戶名稱',
    email: '信箱',
    password: '密碼',
    passwordConfirm: '確認密碼',
  },
  auth: {
    myDashboards: '我的儀錶板',
    myDataSets: '我的資料集',
  },
  dataSet: {
    new: '資料集上傳',
    dataName: '資料集名稱',
    dataInfo: '資料集描述',
    createdAt: '建立時間',
    edit: '編輯',
    delete: '刪除',
    upload: '上傳',
    cancel: '取消',
    uploadSuccess: '上傳成功',
    deleteSuccess: '刪除成功',
  },
  fileAgent: {
    helpText: '點擊或拖曳json檔至此',
    errorType: '檔案類型錯誤',
    errorSize: '檔案大小超過限制',
  },
  fileReader: {
    fail: '檔案讀取失敗',
  },
  dashboard: {
    new: '建立儀錶板',
    edit: '編輯',
    delete: '刪除',
    deleteSuccess: '刪除成功',
  },
  editor: {
    linkData: '連結資料',
    editDashboard: '儀錶板編輯',
    previewDashboard: '儀錶板預覽',
  },
  linkData: {
    newRow: '新增單筆資料',
    newCol: '新增欄位',
    editName: '編輯資料集名稱',
    editInfo: '編輯資料集描述',
    new: '資料集上傳',
    linkDataSelect: '選擇連結資料集',
    linkDataSuccess: '連結資料集成功',
    save: '保存修改',
  },
  editDashboard: {
    edit: '編輯儀錶板資訊',
    dashboardName: '儀錶板名稱',
    dashboardInfo: '儀錶板資訊',
    cancel: '取消',
    save: '保存修改',
    saveSuccess: '保存成功',
  },
  api: {
    userNotFound: '用戶不存在',
    userAccountRequired: '帳號必填',
    userAccountTooShort: '帳號太短',
    userAccountTooLong: '帳號太長',
    userAccountDuplicate: '帳號重複',
    userAccountInvalid: '帳號只能是字母或數字',
    userPasswordRequired: '密碼必填',
    userPasswordTooShort: '密碼太短',
    userPasswordTooLong: '密碼太長',
    userPasswordIncorrect: '密碼錯誤',
    userPasswordNotMatch: '密碼不符',
    userTokenInvalid: '使用者驗證錯誤',
    userTokenExpired: '登入過期',
    userEmailRequired: '信箱必填',
    userEmailInvalid: '信箱格式不符',
    userEmailDuplicate: '信箱重複',
    userUserNameRequired: '用戶名稱必須',
    userUserNameDuplicate: '用戶名稱重複',
    userIdInvalid: '用戶ID不符',
    userIdRequired: '用戶ID需要',
    userPermissionDenied: '用戶權限不足',
    requestFormatError: '請求格式錯誤',
    uploadFailed: '圖片上傳失敗',
    dataNameRequired: '資料集名稱必填',
    dataRequired: '資料集需上傳',
    dataFormatError: '資料格式錯誤',
    dashboardNameRequired: '儀錶板名稱必填',
    dataSetIdInvalid: '資料集ID不符',
    dataSetNotFound: '資料集不存在',
    dashboardIdInvalid: '儀錶板ID不符',
    dashboardNotFound: '儀錶板不存在',
    chartCategoryRequired: '圖表種類必填',
    chartCategoryInvalid: '圖表種類不符',
    chartPosXRequired: '圖表位置X必填',
    chartPosYRequired: '圖表位置Y必填',
    chartWidthRequired: '圖表寬度必填',
    chartHeightRequired: '圖表高度必填',
    useAttributeRequired: '使用屬性必填',
    serverError: '伺服器錯誤',
    unknownError: '未知錯誤',
  },
}
