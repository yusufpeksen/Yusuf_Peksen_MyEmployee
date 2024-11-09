package com.yusufpeksen.myemployee.controller;

import com.yusufpeksen.myemployee.dto.UserDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/api/user/info")
    public UserDTO getUserInfo() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        Object principal = auth.getPrincipal();
        String roles = auth.getAuthorities().toString();

        if (principal instanceof UserDetails userDetails) {
            return new UserDTO(userDetails.getUsername(), roles);
        } else {
            return new UserDTO(username, roles);
        }
    }
}
