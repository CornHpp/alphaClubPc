import request from "../config/request";

export const audioCreate = async (
  creatAudioType: creatAudioType
): Promise<ResponseBaseType<any>> => {
  const url = "/audio/create";
  const response = await request.post<ResponseBaseType<any>>(
    url,
    creatAudioType
  );
  return response;
};

export const audioUpload = async (
  file: any
): Promise<ResponseBaseType<any>> => {
  const url = "/audio/upload";
  const response = await request.post<ResponseBaseType<any>>(url, file);
  return response;
};

// 查询是否又当前audio的权限
export const audioQueryAccess = async (
  audioId: number | string
): Promise<ResponseBaseType<any>> => {
  const url = `audio/get/${audioId}/token`;
  const response = await request.get<ResponseBaseType<any>>(url);
  return response;
};

// 删除一个audio
export const audioDelete = async (
  audioId: number | string
): Promise<ResponseBaseType<any>> => {
  const url = `/audio/${audioId}/delete`;
  const response = await request.delete<ResponseBaseType<any>>(url);
  return response;
};
