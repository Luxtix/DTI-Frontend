export interface EventType {
  id: number;
  title: string;
  image: StaticImageData;
  day: string;
  date: string;
  time: string;
  description: string;
  price: string;
  interested: number;
  category: string;
  location: string;
  host: Host;
}
interface Host {
  name: string;
  logo: string;
}
