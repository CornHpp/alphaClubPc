interface getAllHomeType {
  audioEventDomain: creatAudioType;
  eventDomain: string;
  followersCount: number;
  houseId: number;
  imageUrl: string;
  price: string;
  twitterName: string;
  twitterScreenName: string;
}

type PartialGetAllHomeType = Partial<getAllHomeType>;
