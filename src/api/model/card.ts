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
