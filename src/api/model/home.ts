import request from "../config/request";

export type infoType = {
  pageNum: number;
  pageSize: number;
  queryKey?: string;
};
export const getHouseAll = async (
  params: infoType
): Promise<ResponseBaseType<ResponsepagingBase<PartialGetAllHomeType>>> => {
  const url = "/house/getAll";
  const response = await request.get<
    ResponseBaseType<ResponsepagingBase<PartialGetAllHomeType>>
  >(url, params);

  return response;
};

export const getHolderAll = async (
  params: infoType
): Promise<ResponseBaseType<ResponsepagingBase<PartialGetAllHomeType>>> => {
  const url = "/house/holder/getAll";
  const response = await request.get<
    ResponseBaseType<ResponsepagingBase<PartialGetAllHomeType>>
  >(url, params);

  return response;
};
