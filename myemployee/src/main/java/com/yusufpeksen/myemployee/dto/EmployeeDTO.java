package com.yusufpeksen.myemployee.dto;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeDTO {
    private String firstName;
    private String lastName;
    private String birthDate; // String formatta tarih
    private String jobTitle;
    private String startDate; // String formatta tarih
    private String photoPath;
    private List<AddressDTO> addresses; // Adresleri DTO olarak al
}