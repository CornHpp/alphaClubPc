import request from "../config/request";

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
