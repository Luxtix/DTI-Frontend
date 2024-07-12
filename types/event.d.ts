import { StaticImageData } from "next/image";

export interface EventType {
  id: number;
  address: string;
  venueName: string;
  eventImage: StaticImageData;
  descriptions: string;
  ticketPrice: number;
  priceCategory: string;
  categoryName: string;
  cityName: string;
  isOnline: boolean;
  favoriteCount: number;
  isFavorite: boolean;
  eventDate: string;
  eventDay: string;
  startTime: string;
  endTime: string;
  eventName: string;
}

export interface EventDetailType {
  id: number;
  eventName: string;
  cityName: string;
  address: string;
  eventImage: StaticImageData;
  venueName: string;
  description: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  isOnline: boolean;
  isDone: boolean;
  priceCategory: string;
  organizerName: string;
  organizerAvatar: StaticImageData;
  favoriteCounts: number;
  isFavorite: boolean;
  tickets: {
    id: number;
    name: string;
    price: number;
    qty: number;
    remainingQty: number;
  }[];
}
