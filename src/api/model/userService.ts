import request from "../config/request";

export const getUserInfo = (): Promise<ResponseBaseType<any>> => {
  const url = "/secret/users/getLogin";

  return request.get<ResponseBaseType<any>>(url, {});
};
