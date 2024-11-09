package com.yusufpeksen.myemployee.service;

import com.yusufpeksen.myemployee.model.Address;
import com.yusufpeksen.myemployee.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AddressService {

    @Autowired
    private AddressRepository addressRepository;

    public Address saveAddress(Address address) {
        return addressRepository.save(address);
    }

    public List<Address> getAddressesByEmployeeId(Long employeeId) {
        return addressRepository.findByEmployeeId(employeeId);
    }

    public Address updateAddress(Long id, Address addressDetails) {
        Optional<Address> optionalAddress = addressRepository.findById(id);
        if (optionalAddress.isPresent()) {
            Address address = optionalAddress.get();
            address.setStreetAddress(addressDetails.getStreetAddress());
            address.setCity(addressDetails.getCity());
            address.setState(addressDetails.getState());
            address.setPostalCode(addressDetails.getPostalCode());
            address.setCountry(addressDetails.getCountry());
            address.setAddressType(addressDetails.getAddressType());
            return addressRepository.save(address);
        } else {
            throw new RuntimeException("Address not found");
        }
    }
}