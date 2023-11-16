export interface RestaurantModel {
  name: string;
  foodtype: string;
  address: string;
  province: string;
  postalcode: string;
  tel?: string;
  picture?: string;
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
export const restaurantModel = (): RestaurantModel => ({
  name: "",
  foodtype: "",
  address: "",
  province: "",
  postalcode: "",
  tel: "",
  picture: "",
});
