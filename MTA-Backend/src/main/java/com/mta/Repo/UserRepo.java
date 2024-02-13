package com.mta.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.mta.entities.CAN_BASIC_DET;

import jakarta.transaction.Transactional;

public interface UserRepo extends JpaRepository<CAN_BASIC_DET, Integer>{

	public CAN_BASIC_DET findByUserId(int id);
	
	@Query(value = "select * from CAN_BASIC_DET where can_email = ? and role_id = 2 ", nativeQuery = true)
	public CAN_BASIC_DET getUserByUserName(String str);
	
	@Transactional 
	@Modifying  // @Modifying is used to indicate that the query modifies the database. 
				//This annotation is required for any query method that modifies the database.
	@Query(value = "Delete from CAN_BASIC_DET where can_basic_id = ? ", nativeQuery = true)
	public void deleteUserByUserId(int id);
	
	@Transactional	// @Transactional ensures that the deletion operation is executed within a transaction.
	@Modifying
	@Query(value = "Delete from CAN_BASIC_DET", nativeQuery = true)
	public void deleteAllUsers();
	
	@Query(value = "select * from CAN_BASIC_DET where can_email = ? and password = ? and role_id = ? ", nativeQuery = true)
	public CAN_BASIC_DET checkUserNameAndPasswordWithRoleId(String userName, String password, int id);

	@Query(value = "select * from CAN_BASIC_DET where can_email = ? and password = ? and role_id = ? ", nativeQuery = true)
	public CAN_BASIC_DET checkUserNameAndPasswordWithRoleName(String userName, String password, int id);
}
