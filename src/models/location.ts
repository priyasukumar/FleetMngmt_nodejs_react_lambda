export interface ILocationContainerProps {
    location: ILocationProps[];
    loadLocation: (driverId: number, fromDate: Date, toDate: Date) => void;
}

export interface ILocationProps {
    DriverName: string,
    DriverMobile: string,
    VehicleLicenseNo: string,
    VehicleName: string,
    Latitude: number,
    Longitude: number,
    PacketTime: string    
}