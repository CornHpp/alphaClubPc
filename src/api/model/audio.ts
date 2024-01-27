import request from "../config/request"

export const audioCreate = async (
  creatAudioType: creatAudioType
): Promise<ResponseBaseType<any>> => {
  const url = "/audio/create"
  const response = await request.post<ResponseBaseType<any>>(
    url,
    creatAudioType
  )
  return response
}

export const audioUpload = async (
  file: any
): Promise<ResponseBaseType<any>> => {
  const url = "/audio/upload"
  const response = await request.post<ResponseBaseType<any>>(url, file)
  return response
}
