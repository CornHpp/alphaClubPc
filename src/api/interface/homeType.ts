interface getAllHomeType {
  audioEventDomain: string;
  eventDomain: string;
  followersCount: number;
  houseId: number;
  imageUrl: string;
  price: string;
  twitterName: string;
  twitterScreenName: string;
}

type PartialGetAllHomeType = Partial<getAllHomeType>;
