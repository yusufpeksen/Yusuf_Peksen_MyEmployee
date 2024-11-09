package com.yusufpeksen.myemployee.repository;

import com.yusufpeksen.myemployee.model.AddressType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AddressTypeRepository extends JpaRepository<AddressType,Long> {
    Optional<AddressType> getAddressTypeById(Long id);
}
