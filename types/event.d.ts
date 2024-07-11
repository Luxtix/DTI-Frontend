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
  favoriteCount: number;
  eventDate: string;
  eventDay: string;
  startTime: string;
  endTime: string;
  eventName: string;
  online: boolean;
  favorite: boolean;
  organizerName: string;
  organizerAvatar: StaticImageData;
}
