export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: Date;
  jobTitle: string;
  startDate: Date;
  photoPath: string;
  addresses: string[];
}

export interface Address {
  addressTypeId: number;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  addressType?: AddressType;
}

export interface AddressType {
  id: number;
  typeName: string;
}

export interface UseGetEmployeeByIdProps {
  id: string | number;
}
