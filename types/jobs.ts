export interface Job {
  id: number;
  title: string;
  description: string;
  category: {
    id: number;
    name: string;
    isActive: boolean;
  };
  subCategory?: [{
    id: number;
    name: string;
    isActive: boolean;
  }];
  expectedDeliveryTime: string;
  jobType: {
    id: number;
    name: string;
  };
  jobLevel: {
    id: number;
    name: string;
  };
  user?: {
    id: number
    firstName: string,
    lastName: string,
  }
  price: number;
  status: number;
  fileKey: URL;
  fileLocation: URL;
  createdAt: string;
  updatedAt: string;
  skill:any
}

export interface JobLevel {
  id: number,
  name: string,
}

export interface JobType {
  id: number,
  name: string,
}