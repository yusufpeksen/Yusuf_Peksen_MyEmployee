package com.yusufpeksen.myemployee.service;

import com.yusufpeksen.myemployee.model.AddressType;
import com.yusufpeksen.myemployee.repository.AddressTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressTypeService {

    @Autowired
    private AddressTypeRepository addressTypeRepository;

    public List<AddressType> getAllAdressTypes() {
        return addressTypeRepository.findAll();
    }

    public Optional<AddressType> getAdressTypeById(Long id) {
        return  addressTypeRepository.getAddressTypeById(id);
    }

    public AddressType saveAddressType(AddressType addressType) {
        return addressTypeRepository.save(addressType);
    }

}
