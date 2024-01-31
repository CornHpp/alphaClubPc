interface getTradeListType {
  imageUrl: string;
  keys: number;
  tradeType: number;
  twitterName: string;
  twitterUid: string;
  createTime: string;
  moneyCount: string;
  price: string;
}

interface getTradeOrderList {
  followersCount: number;
  holders: number;
  houseId: number;
  imageUrl: string;
  price: number | string;
  twitterName: string;
  twitterScreenName: string;
}

interface responseScreenNameType {
  arrived: number;
  followersCount: number;
  imageUrl: string;
  tickets: number;
  twitterName: string;
  twitterScreenName: string;
  twitterUid: string;
  started: number;
}

interface responseTwitterListType {
  twitterUid: string;
  twitterName: string;
  twitterScreenName: string;
  imageUrl: string;
  followersCount: number;
  arrived: 0;
  price: string;
  createTime: string;
  updateTime: string;
  holdings: number;
}

type PartialGetTradeOrderList = Partial<getTradeOrderList>;

type PartialGetTradeListType = Partial<getTradeListType>;

type PartialResponseScreenNameType = Partial<responseScreenNameType>;

type PartialResponseTwitterListType = Partial<responseTwitterListType>;
