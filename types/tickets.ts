export interface Tickets {
  id: number;
  subject: string;
  status: string;
  description: string;
  fileLocations: {
    location: URL;
    key: URL;
  };
  createdAt: string;
  updatedAt: string;
  user:{
    id: number;
  }
}
