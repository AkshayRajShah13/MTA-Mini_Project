package com.mta.service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import com.mta.Repo.AdminRepo;
import com.mta.Repo.RoleRepo;
import com.mta.Repo.UserRepo;
import com.mta.entities.Admin;
import com.mta.entities.CAN_BASIC_DET;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UsersDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepository;
    
    @Autowired
    private AdminRepo  adminRepository;

    @Autowired
    private RoleRepo roleRepository;
    private Logger logger = LoggerFactory.getLogger(OncePerRequestFilter.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        
        Admin admin = adminRepository.getUserByUserName(username);
//        System.out.println("admin - "+admin);
        CAN_BASIC_DET user = userRepository.getUserByUserName(username);
//        System.out.println("user -"+user);
        
        if (admin == null && user == null  ) {
        	throw new UsernameNotFoundException("User not found");
        }
        
        String role = null;
        if (user != null) {
        	logger.info("user.............");
            role = roleRepository.findRoleNameByRoleId(user.getRole().getRoleId());
        } else if (admin != null) {
        	logger.info("admin...........!");
            role = roleRepository.findRoleNameByRoleId(admin.getRole().getRoleId());
        }

//        System.out.println("role -"+role);

        if (role.equalsIgnoreCase("admin")) {
        	System.out.println("if block - "+ admin);
           	return admin;
        } else {
        	System.out.println("if block - "+ user);
        	return user;
        }
    }
}