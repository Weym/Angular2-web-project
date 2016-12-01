export interface User {
	$key?:string;
	uid:string;
	firstName:string;
	lastName:string;
	gender:string;
	birthday:string;
	languages:string[];
	skills:string[];
	about:string;
	country:string;
	city:string;
	email:string;
	isActive:boolean;
	createdAt:string;
}