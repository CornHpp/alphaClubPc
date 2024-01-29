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

// 获取拥有当前房间的key的数量
export const getCurrentEventKeys = async (
  houseId: string
): Promise<ResponseBaseType<string>> => {
  const url = "/keyholder/keys?houseId=" + houseId;
  const response = await request.get<ResponseBaseType<string>>(url);

  return response;
};

export interface eventPriceBykeysType {
  walletFromBalance: string;
  walletTo: string;
  orderPrice: string;
  walletFrom: string;
}

// 获取当前房间传入不同的key获取不同的价格
export const getCurrentEventPriceByKeyNumber = async (
  houseId: string,
  key: string
): Promise<ResponseBaseType<eventPriceBykeysType>> => {
  const url = "/house/getBuyPrice?houseId=" + houseId + "&keys=" + key;
  const response = await request.get<ResponseBaseType<eventPriceBykeysType>>(
    url
  );

  return response;
};

// 购买key
export const buyKey = async (params: {
  houseId?: string;
  keys?: string;
  buyPrice?: string;
}): Promise<ResponseBaseType<any>> => {
  const url = "/house/buy";
  const response = await request.post<ResponseBaseType<any>>(url, params);

  return response;
};

// 获取卖出的价格
export const getSellPrice = async (
  houseId?: string,
  Keys?: string
): Promise<ResponseBaseType<any>> => {
  const url = "/house/getSellPrice?houseId=" + houseId + "&keys=" + Keys;
  const response = await request.get<ResponseBaseType<any>>(url);

  return response;
};

interface balanceInfoResonseType {
  balance: string;
  holdingValue: string;
  score: string;
  totalBalance: string;
}

// 获取自己的钱包
export const getSelfUsersBalanceinfo = async (): Promise<
  ResponseBaseType<balanceInfoResonseType>
> => {
  const url = "/secret/users/balance/info";
  const response = await request.get<ResponseBaseType<balanceInfoResonseType>>(
    url
  );

  return response;
};
