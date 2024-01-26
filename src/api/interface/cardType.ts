interface getTradeListType {
  imageUrl: string;
  keys: number;
  tradeType: number;
  twitterName: string;
  twitterUid: string;
  createTime: string;
  moneyCount: string;
}

interface getTradeOrderList {
  followersCount: number;
  holdcount: number;
  houseId: number;
  imageUrl: string;
  price: number;
  twitterName: string;
  twitterScreenName: string;
}

type PartialGetTradeOrderList = Partial<getTradeOrderList>;

type PartialGetTradeListType = Partial<getTradeListType>;
