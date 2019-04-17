declare namespace Ajax {
  // axios 返回数据

  // 请求接口数据
  export interface AjaxResponse {
    code: number,
    data: any,
    message: string,
    error_code?: number,
    error_message?: string
  }
}