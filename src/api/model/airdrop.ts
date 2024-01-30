import request from "../config/request";

export interface usersAirdropRequestType {
  followersCount: number;
  imageUrl: string;
  parentFollowersCount: number;
  parentImageUrl: string;
  parentTwitterName: string;
  parentTwitterScreenName: string;
  parentTwitterUid: string;
  score: number;
  twitterName: string;
  twitterScreenName: string;
  twitterUid: string;
}

export type PartialUsersAirdropRequestType = Partial<usersAirdropRequestType>;

export const getUsersAirdrop = async (
  data: paramsType
): Promise<ResponsePagingType<PartialUsersAirdropRequestType>> => {
  const url = "/secret/users/airdrop";
  const response = await request.get<
    ResponsePagingType<PartialUsersAirdropRequestType>
  >(url, data);
  return response;
};

export interface taskInfoType {
  scoreType: number;
  scoreCount: number;
  canOpen: boolean;
  opened: boolean;
  currentMount: string;
  counted: number;
}

export const getAllTaskInfo = async (): Promise<
  ResponseBaseTypeArrResult<taskInfoType>
> => {
  const url = "/task/getAllTaskInfo";
  const response = await request.get<ResponseBaseTypeArrResult<taskInfoType>>(
    url
  );
  return response;
};

// 开宝箱
export const openTreasureBox = async (
  scoreType: number
): Promise<ResponseBaseType<taskInfoType>> => {
  const url = "/task/box/open";
  const response = await request.post<ResponseBaseType<taskInfoType>>(url, {
    scoreType,
  });
  return response;
};
