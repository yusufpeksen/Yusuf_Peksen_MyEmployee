package com.yusufpeksen.myemployee.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeDTO {
    private String firstName;
    private String lastName;
    private String birthDate;
    private String jobTitle;
    private String startDate;
    private String photoPath;
    private List<AddressDTO> addresses;
}