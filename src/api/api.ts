import request from '@/axios/request'

export const queryCreditStatusNew = (data?: any) => request.post('/blc-service/query/queryCreditStatusNew', data);