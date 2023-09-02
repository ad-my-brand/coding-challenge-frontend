export type UserData = {
  id: number;
  name: string;
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
};
