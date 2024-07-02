export interface EventType {
  id: number;
  title: string;
  image: StaticImageData;
  day: string;
  date: string;
  time: string;
  description: string;
  price: number;
  vipPrice: number;
  vvipPrice: number;
  interested: number;
  category: string;
  type: string;
  venue: string;
  location: string;
  city: string;
  host: {
    name: string;
    logo: string;
  };
  quota: number;
  vipQuota: number;
  vvipQuota: number;
}
