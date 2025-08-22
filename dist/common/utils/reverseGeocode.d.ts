export declare function reverseGeocode(lat: number, lng: number): Promise<{
    pincode?: undefined;
    city?: undefined;
    state?: undefined;
    country?: undefined;
    street?: undefined;
    landmark?: undefined;
} | {
    pincode: number | null;
    city: any;
    state: any;
    country: any;
    street: any;
    landmark: string;
}>;
