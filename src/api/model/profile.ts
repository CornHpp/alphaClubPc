import request from "../config/request";

export type paramsType = {
  pageNum: number;
  pageSize: number;
};

interface personTradeParamType extends paramsType {
  houseId?: any;
}

interface audioPersonListType extends paramsType {
  houseId?: string;
  source?: number;
}

interface holdingType extends paramsType {
  twitterUid?: string;
}

export const getPersonTradeList = async (
  params: personTradeParamType
): Promise<ResponsePagingType<PartialGetTradeListType>> => {
  const url = "/trade/person/getTradeList";
  const response = await request.get<
    ResponsePagingType<PartialGetTradeListType>
  >(url, params);

  return response;
};

export const getAudioPersonList = async (
  params: audioPersonListType
): Promise<ResponsePagingType<creatAudioType>> => {
  const url = "/audio/person/event";
  const response = await request.get<ResponsePagingType<creatAudioType>>(
    url,
    params
  );

  return response;
};

export const keyholderHolding = async (
  params: holdingType
): Promise<ResponsePagingType<PartialGetTradeListType>> => {
  const url = "/keyholder/holding";
  const response = await request.get<
    ResponsePagingType<PartialGetTradeListType>
  >(url, params);

  return response;
};

export const keyholderHolders = async (
  params: holdingType
): Promise<ResponsePagingType<PartialGetTradeListType>> => {
  const url = "/keyholder/holders";
  const response = await request.get<
    ResponsePagingType<PartialGetTradeListType>
  >(url, params);

  return response;
};

// 获取个人门槛信息
export const getPersonThreshold = async (
  houseId: string
): Promise<ResponseBaseType<any>> => {
  const url = "/house/get/threshold?houseId=" + houseId;
  const response = await request.get<ResponseBaseType<any>>(url);

  return response;
};

// 设置个人门槛
export const setPersonThreshold = async (
  houseId: string,
  threshold: number,
  thresholdFlag: boolean
): Promise<ResponseBaseType<any>> => {
  const url = "/house/updateThreshold";

  const response = await request.post<ResponseBaseType<any>>(url, {
    houseId,
    threshold,
    thresholdFlag,
  });

  return response;
};
