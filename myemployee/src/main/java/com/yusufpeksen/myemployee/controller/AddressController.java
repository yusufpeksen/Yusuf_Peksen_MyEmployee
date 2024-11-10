package com.yusufpeksen.myemployee.controller;

import com.yusufpeksen.myemployee.dto.AddressDTO;
import com.yusufpeksen.myemployee.model.Address;
import com.yusufpeksen.myemployee.model.AddressType;
import com.yusufpeksen.myemployee.model.Employee;
import com.yusufpeksen.myemployee.service.AddressService;
import com.yusufpeksen.myemployee.service.AddressTypeService;
import com.yusufpeksen.myemployee.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private AddressTypeService addressTypeService;

    @PostMapping
    public ResponseEntity<Address> createAddress(@RequestBody AddressDTO addressDTO) {
        Address address = new Address();
        address.setStreetAddress(addressDTO.getStreetAddress());
        address.setCity(addressDTO.getCity());
        address.setState(addressDTO.getState());
        address.setPostalCode(addressDTO.getPostalCode());
        address.setCountry(addressDTO.getCountry());

        Employee employee = employeeService.getEmployeeById(addressDTO.getEmployeeId())
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        AddressType addressType = addressTypeService.getAdressTypeById(addressDTO.getAddressTypeId())
                .orElseThrow(() -> new RuntimeException("AddressType not found"));

        address.setEmployee(employee);
        address.setAddressType(addressType);

        Address savedAddress = addressService.saveAddress(address);
        return ResponseEntity.ok(savedAddress);
    }
    @GetMapping("/{employeeId}")
    public List<Address> getAddressesByEmployeeId(@PathVariable Long employeeId) {
        return addressService.getAddressesByEmployeeId(employeeId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Address> updateAddress(@PathVariable Long id, @RequestBody Address addressDetails) {
        Address updatedAddress = addressService.updateAddress(id, addressDetails);
        return ResponseEntity.ok(updatedAddress);
    }
}