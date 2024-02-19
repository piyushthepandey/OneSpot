export interface ActivityPostData {
    _id?: string;
    title: string;
    description: string;
    category: string;
    // userName: string;
    // userId: string;
    activityPostImages: { data: string }[];
    // preferences: [{
    //     indoor: string;
    // },
    // {
    //     outdoor: string;
    // }]
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