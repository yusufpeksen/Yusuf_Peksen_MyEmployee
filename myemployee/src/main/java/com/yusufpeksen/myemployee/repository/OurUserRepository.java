package com.yusufpeksen.myemployee.repository;

import com.yusufpeksen.myemployee.model.OurUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OurUserRepository extends JpaRepository<OurUser, Long> {
    Optional<OurUser> findByUsername(String username);
}