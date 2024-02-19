export interface HousingPost {
    _id?: string;
    title: string;
    description?: string;
    preferences: {
      gender: string;
      location: string;
      rent: number;
      moveInDate: string;
      isOnLease: boolean;
      noOfBeds: number;
      noOfBaths: number;
      noOfTenants: number;
    };
    benefits: {
      freeLaundryInUnit?: boolean;
      heatingInUnit?: boolean;
      gymInBuilding?: boolean;
      freeWifi?: boolean;
      balcony?: boolean;
      parkingSpace?: boolean;
    };
    author: string;
    housingPostImages: {
      data: string;
      fileName: string;
      fileType: string;
    }[];
    // rsvps: { userId: string; _id: string }[];
    // savedByUsers: { userId: string; _id: string }[];
    createdDate: string;
    updateDate: string;
  }
  
  export interface ActivityPost {
    _id?: string;
    title: string;
    description: string;
    userName: string;
    userId: string;
    activityPostImages: {
      data: string;
      fileName: string;
      fileType: string;
    }[];
    // shared: boolean[];
    // shareCount: number;
    // rsvps: {
    //   userId: string;
    //   _id: string;
    // }[];
    // savedBy: {
    //   userId: string;
    //   _id: string;
    // }[];
    createdDate: string;
    updateDate: string;
  }