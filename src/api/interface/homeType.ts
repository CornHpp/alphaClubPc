interface getAllHomeType {
  audioEventDomain: creatAudioType;
  eventDomain: string;
  followersCount: number;
  houseId: string;
  imageUrl: string;
  price: string;
  twitterName: string;
  twitterScreenName: string;
}

type PartialGetAllHomeType = Partial<getAllHomeType>;

type uniteHomeAlltype = creatAudioType & PartialGetAllHomeType;
