/*
 * @Description: 用户相关数据存储
 * @Author: Caroline
 * @Date: 2023-05-08 12:59:52
 * @LastEditTime: 2023-05-15 17:01:54
 * @LastEditors: Caroline
 * @FilePath: \recruit-app\src\redux\features\userSlice.ts
 */

import { createSlice } from "@reduxjs/toolkit";

// 存储的用户数据类型
export type UserInfoType = {
  bindInviteCode?: string;
  followersCount?: number;
  imageUrl?: string;
  twitterName?: string;
  twitterScreenName?: string;
  walletAddress?: string;
  twitterUidStr?: number;
};

export interface UserStateType {
  userinfo: UserInfoType;
  isMobile?: boolean;
  SASToken: string;
  balance: number;
  etherObject: any;
}

const initialState: UserStateType = {
  userinfo: {},
  balance: 0,
  isMobile: true,
  SASToken: "",
  etherObject: {},
};

export const tokenSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userinfo = action.payload;
    },

    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },

    setSASToken: (state, action) => {
      state.SASToken = action.payload;
    },
    setBalance: (state, action) => {
      state.balance = action.payload;
    },
    setEtherObject: (state, action) => {
      state.etherObject = action.payload;
    },
  },
});

export const {
  setUserInfo,
  setIsMobile,
  setSASToken,
  setBalance,
  setEtherObject,
} = tokenSlice.actions;

export default tokenSlice.reducer;
