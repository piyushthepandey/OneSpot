export interface HousingData {
    _id?: string;
    title: string;
    description: string;
    preferences: {
      rent: number;
      location: string;
      gender: string;
      moveInDate: string;
      isOnLease: boolean;
      noOfBeds: number;
      noOfBaths: number;
      noOfTenants: number;
      smoking: boolean;
      alcohol: boolean;
      veg: boolean;
      nonVeg: boolean;
    };
    benefits: {
      freeLaundryInUnit: boolean;
      heatingInUnit: boolean;
      gymInBuilding: boolean;
    };
    housingPostImages: { data: string }[];
    rsvps: string[];
    savedByUsers: string[];
  }