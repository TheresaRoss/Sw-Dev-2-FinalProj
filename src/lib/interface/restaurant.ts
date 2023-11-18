export interface RestaurantModel {
  name: string;
  foodtype: string;
  address: string;
  province: string;
  postalcode: string;
  tel?: string;
  picture?: string;
}
export interface ReservationModel {
  bookingDate: string;
  numOfGuests: string;

  createdAt: string;
}
export interface RestaurantResponse {
  id: string;
  name: string;
  foodtype: string;
  address: string;
  province: string;
  postalcode: string;
  tel?: string;
  picture?: string;
}
export interface ReservationResponse {
  _id: string;
  bookingDate: string;
  numOfGuests: string;
  user: string;
  restaurant: RestaurantResponse;
  createdAt: string;
}
export const restaurantModel = (): RestaurantModel => ({
  name: "",
  foodtype: "",
  address: "",
  province: "",
  postalcode: "",
  tel: "",
  picture: "",
});
export const reservationModel = (): ReservationModel => ({
  bookingDate: "",
  numOfGuests: "",

  createdAt: "",
});
