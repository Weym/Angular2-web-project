import { Image } from "./image.interface";

export interface Host {
  $key?:string;
  uid:string;
  title:string;
  isActive:boolean;
  featuredImage:string;
  country:string;
  city:string;
  state:string;
  images:Image[];
  languages:string[];
  placeDescription:string;
  email:string,
  benefits:string;
  expectedFromVolunteers:string;
  expectedWorkingTime:string;
  createdAt:string;
  latitude:number;
  longitude:number;
  accomodation:string;
  skillsNeeded:string[];
}
