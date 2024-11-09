package com.yusufpeksen.myemployee.repository;

import com.yusufpeksen.myemployee.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address,Long> {
    List<Address> findByEmployeeId(Long id);
}
