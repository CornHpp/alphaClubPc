interface getAllHomeType {
  audioEventDomain: creatAudioType;
  eventDomain: string;
  followersCount: number;
  houseId: string;
  imageUrl: string;
  price: string;
  priceStr: string;
  twitterName: string;
  twitterScreenName: string;
  holders: number;
}

type PartialGetAllHomeType = Partial<getAllHomeType>;

type uniteHomeAlltype = creatAudioType & PartialGetAllHomeType;
