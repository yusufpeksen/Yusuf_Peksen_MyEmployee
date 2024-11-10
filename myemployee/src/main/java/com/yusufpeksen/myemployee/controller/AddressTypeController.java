package com.yusufpeksen.myemployee.controller;

import com.yusufpeksen.myemployee.model.AddressType;
import com.yusufpeksen.myemployee.service.AddressTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/address-types")
public class AddressTypeController {

    @Autowired
    private AddressTypeService addressTypeService;

    @GetMapping
    public List<AddressType> getAllAddressTypes() {
        return addressTypeService.getAllAdressTypes();
    }

    @GetMapping("/{id}")
    public Optional<AddressType> getAddressTypeById(@PathVariable Long id) {
        return addressTypeService.getAdressTypeById(id);
    }

    @PostMapping
    public AddressType createAddressType(@RequestBody AddressType addressType) {
        return addressTypeService.saveAddressType(addressType);
    }
}