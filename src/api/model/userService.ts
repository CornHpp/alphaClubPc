import request from "../config/request";

import {
  decryptWithPrivateKey,
  generateKeyPair,
  getPublicKeyPEM,
} from "./cryptoHelp";

export const getUserInfo = (): Promise<ResponseBaseType<any>> => {
  const url = "/secret/users/getLogin";

  return request.get<ResponseBaseType<any>>(url, {});
};

export interface inviteCodeResponseType {
  inviteCode: string;
  isCopy?: boolean;
}

export const getUserInviteCode = (): Promise<
  ResponseBaseType<inviteCodeResponseType[]>
> => {
  const url = "/secret/invite/get";
  return request.get<ResponseBaseType<inviteCodeResponseType[]>>(url, {});
};

// 根据twitterId获取用户信息
export const getUserInfoByTwitterId = (
  twitterId: string
): Promise<ResponseBaseType<any>> => {
  const url = "/secret/users/info?twitterUid=" + twitterId;
  return request.get<ResponseBaseType<any>>(url, { twitterId });
};

export const sendEth = (wallet: string, amount: number): Promise<string> => {
  const url = "/wallet/transfer?wallet=" + wallet + "&amount=" + amount;
  return request.get<string>(url);
};

export const exportWallet = async (): Promise<string> => {
  const keys = await generateKeyPair();
  const pubKey = getPublicKeyPEM(keys);
  const data = {
    encryptKey: pubKey,
  };

  const url = "/wallet/export";
  const res = await request.post<ResponseBaseType<string>>(url, data);
  const privateKey = await decryptWithPrivateKey(keys.privateKey, res.result);
  return privateKey;
};
