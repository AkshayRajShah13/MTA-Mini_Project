package com.mta.service;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mta.Repo.UserRepo;
import com.mta.entities.CAN_BASIC_DET;
import com.mta.entities.Role;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);
   
	@Autowired
	private UserRepo repo;

	// --------------- Fetch User by Id ---------------------
	public CAN_BASIC_DET getUserById(int id) {
		CAN_BASIC_DET usr = repo.findByUserId(id);
		return usr;
	}
	
	// --------------- Fetch User by name ---------------------
	public CAN_BASIC_DET getUserByName(String name) {
		CAN_BASIC_DET usr = repo.getUserByUserName(name);
		return usr;
	}

	// --------------- Fetch All User ---------------------
	public List<CAN_BASIC_DET> getAllUser() {
		List<CAN_BASIC_DET> users = repo.findAll();
		return users;
	}

	// --------------- Authenticate User by role_Id ---------------------
	public CAN_BASIC_DET chckUser(String usr, String pswd, int roleId) {
		CAN_BASIC_DET user = repo.checkUserNameAndPasswordWithRoleId(usr, pswd, roleId);
//		System.out.println(user);
		return user;
	}

	// --------------- Authenticate User by role_name ---------------------
	public CAN_BASIC_DET chckUser(String usr, String pswd, String role) {
		int id = role.equals("Admin") ? 1 : 2;
//		System.out.println("id : " + id);
		CAN_BASIC_DET user = repo.checkUserNameAndPasswordWithRoleName(usr, pswd, id); //
		System.out.println(user);
		return user;
	}

	// --------------- Add User to database ---------------------
	public void addUser(CAN_BASIC_DET usr) {
		repo.save(usr);
	}

	// --------------- Update User by Id ---------------------
	@Transactional
	public CAN_BASIC_DET updateUser(CAN_BASIC_DET usr) {
		logger.info("Given user  : {}",usr);
		CAN_BASIC_DET existUser = repo.findByUserId(usr.getUserId());
		logger.info("existing user available -: {}",existUser);
		if(existUser != null) {
			Role role = new Role();
			role.setRoleId(2);
			usr.setRole(role);
			existUser = repo.save(usr);
			
		}
		return existUser;
//		User user = null;
//		if (usr.getUserId() == id) {
//			user = repo.save(usr);
//		}
//		return user;
	}

	// --------------- Delete User by Id ---------------------
	public Optional<CAN_BASIC_DET> delUserById(int id) {
		Optional<CAN_BASIC_DET> usr = repo.findById(id);
		if (usr.isPresent()) {

			logger.info("Deleting user with userId: {}", id);
			repo.deleteUserByUserId(id);
			logger.info("User deleted successfully");
//			repo.deleteByUserId(id);
//			repo.deleteById(id);
//			Optional<User> u = repo.findById(id);
//			System.out.println(":" +u);
			return usr;
		} else
			return usr;
	}

	// --------------- Delete All User ---------------------
	public void delAllUser() {
		repo.deleteAllUsers();
	}

}
