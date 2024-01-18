package com.hackathon.Respositories.LoginSignupRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.models.LoginSignup.User;



@Repository
public interface LoginSignupRepo extends JpaRepository<User, Long> {

	User  findByName(String name);
	
	
}
