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
