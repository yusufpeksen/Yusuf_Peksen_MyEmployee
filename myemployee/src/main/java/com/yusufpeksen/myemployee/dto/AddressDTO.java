package com.yusufpeksen.myemployee.dto;

import lombok.Data;

@Data
public class AddressDTO {
    private Long employeeId;
    private Long addressTypeId;
    private String streetAddress;
    private String city;
    private String state;
    private String postalCode;
    private String country;
}