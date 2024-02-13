package com.mta.controller;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mta.entities.CAN_BASIC_DET;
import com.mta.entities.Role;
import com.mta.jwt.Helper;
import com.mta.jwt.JwtResponse;
import com.mta.service.UserService;
import com.mta.service.UsersDetailsServiceImpl;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

	@Autowired
	private UserService dao;
	
	@Autowired
	private Helper helper;
	
	@Autowired
	private PasswordEncoder pswdEncoder;
	
	@Autowired
	private UsersDetailsServiceImpl userDetailService;

	@Autowired
    private AuthenticationManager authenticationManager;

	@PostMapping("/login") 
    public JwtResponse authenticateAndGetToken(@RequestBody CAN_BASIC_DET usr) throws AuthenticationException { 
        Authentication authenticate = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(usr.getEmail(), usr.getPassword())); 
        if (authenticate.isAuthenticated()) { 
        	CAN_BASIC_DET user = (CAN_BASIC_DET) userDetailService.loadUserByUsername(usr.getEmail());
//        	System.out.println("controller : " + user);
        	String token = helper.generateToken(usr);
//        	System.out.println(token);
            return new JwtResponse(user,token);
        } else { 
            throw new UsernameNotFoundException("invalid user request !"); 
        } 
    } 

//	// ---------------- Authentication Check ------------------
//	@PostMapping("/auth")
//	public ResponseEntity<CAN_BASIC_DET> authentication(@RequestBody CAN_BASIC_DET log) {
//		try {
////			System.out.println(log);
//			CAN_BASIC_DET chck = dao.chckUser(log.getEmail(), log.getPassword(), log.getRole().getRoleName());
////			System.out.println(log.getRoleId().getRoleName());
////			System.out.println("controller --- "+chck);
//			if (chck == null)
//				return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
//			else
//				return ResponseEntity.of(Optional.of(chck));
//		} catch (Exception e) {
//			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//		}
//	}

	// ---------------- Fetch User data from Id ------------------
	@GetMapping("/get/{id}")
	public ResponseEntity<CAN_BASIC_DET> getUserById(@PathVariable("id") int id) {
		CAN_BASIC_DET usr = dao.getUserById(id);
		System.out.println(usr);
		if (usr == null)
			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

		return ResponseEntity.of(Optional.of(usr));
	}

	// ---------------- Fetch Current user ------------------
	
	@GetMapping("/current-user")
	public String loggedInUser(Principal p) {
		System.out.println(p);
		return p.getName();
	}
	
	// ---------------- Fetch All Users ------------------
	@GetMapping("/gets")
	public ResponseEntity<List<CAN_BASIC_DET>> getAllUser() {
		try {
			List<CAN_BASIC_DET> allUser = dao.getAllUser();
			if (allUser.size() > 0)
				return ResponseEntity.status(HttpStatus.OK).body(allUser);

			return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// ---------------- Add User data to the database ------------------
	@PostMapping("/add")
	public ResponseEntity<String> addUser(@RequestBody CAN_BASIC_DET usr) {
		try {
			if(dao.getUserByName(usr.getEmail())!= null) {
				return new ResponseEntity<>("User already exist", HttpStatus.FOUND);
			}
//			usr.setPassword(pswdEncoder.encode(usr.getPassword()));
			Role defaultRole = new Role();
			defaultRole.setRoleName("User");
			defaultRole.setRoleId(2); // Set the default role ID here
			usr.setRole(defaultRole);
			dao.addUser(usr);				
//	        return ResponseEntity.status(HttpStatus.CREATED).body("User Created Successfully");

			return new ResponseEntity<>("User Created Successfully", HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	
	// ---------------- Update User data to the database ------------------
	@PutMapping("/update")
	public ResponseEntity<CAN_BASIC_DET> updateUser(@RequestBody CAN_BASIC_DET usr) {
		
		try {
//			usr.setPassword(pswdEncoder.encode(usr.getPassword()));
			dao.updateUser(usr);
			return ResponseEntity.status(HttpStatus.ACCEPTED).build();	
		}catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
 
	// ---------------- Delete User data ------------------
	@DeleteMapping("/del/{id}")
	public ResponseEntity<String> delUserById(@PathVariable("id") int id) {
		Optional<CAN_BASIC_DET> usr = dao.delUserById(id);
//		System.out.println(usr);
		try {
			if (usr.isPresent())
				return new ResponseEntity<>("user deleted successfully", HttpStatus.NO_CONTENT);
			else
				return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}

	// ---------------- Delete All User data ------------------
	@DeleteMapping("/dels")
	public ResponseEntity<String> delAllUser() {
		try {
			dao.delAllUser();
			return new ResponseEntity<>("All users has been deleted successfully", HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
}
