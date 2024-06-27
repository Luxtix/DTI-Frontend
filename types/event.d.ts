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
  interested: number;
  category: string;
  type: string;
  venue: string;
  location: string;
  city: string;
  host: Host;
  quota: number;
  vipQuota: number;
}
interface Host {
  name: string;
  logo: string;
}
