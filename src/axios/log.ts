export const addAjaxErrorLog = (err: any) => {
  const { url, method, params, data, requestOptions } = err.config;
 addErrorLog({
      type:'ajax',
      url: <string>url,
      method,
      params: ["get", "delete"].includes(<string>method) ? JSON.stringify(params) : JSON.stringify(data),
      data: err.data ? JSON.stringify(err.data) : "",
      detail: JSON.stringify(err)
  });

};