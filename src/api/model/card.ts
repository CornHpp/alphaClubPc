import request from "../config/request";

export type paramsType = {
  pageNum: number;
  pageSize: number;
};
export const getTradeGetAllTradeList = async (
  params: paramsType
): Promise<ResponseBaseTypeArrResult<PartialGetTradeListType>> => {
  const url = "/trade/getAllTradeList";
  const response = await request.get<
    ResponseBaseTypeArrResult<PartialGetTradeListType>
  >(url, params);

  return response;
};

export const getTradeGetHouseGetOrderList = async (
  params: paramsType
): Promise<ResponsePagingType<PartialGetTradeOrderList>> => {
  const url = "/house/getOrderList";
  const response = await request.get<
    ResponsePagingType<PartialGetTradeOrderList>
  >(url, params);

  return response;
};

// 搜索twitter的内容
export const getTwitterSearch = async (
  screenName: string | undefined
): Promise<ResponseBaseType<PartialResponseScreenNameType>> => {
  const url = "/secret/twitter/byScreenName?screenName=" + screenName;
  const response = await request.get<
    ResponseBaseType<PartialResponseScreenNameType>
  >(url);
  return response;
};

// 获取用户的twitter列表
export const getTwitterList = async (
  params: paramsType
): Promise<ResponsePagingType<PartialResponseTwitterListType>> => {
  const url = "/secret/twitter/pollsrank/list";
  const response = await request.get<
    ResponsePagingType<PartialResponseTwitterListType>
  >(url, params);
  return response;
};
