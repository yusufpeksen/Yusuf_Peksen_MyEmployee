package com.yusufpeksen.myemployee.service;

import com.yusufpeksen.myemployee.model.OurUser;
import com.yusufpeksen.myemployee.repository.OurUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class OurUserService {

    private final OurUserRepository ourUserRepository;

    public Optional<OurUser> getOurUserByUsername(String username) {
        return ourUserRepository.findByUsername(username);
    }
}
