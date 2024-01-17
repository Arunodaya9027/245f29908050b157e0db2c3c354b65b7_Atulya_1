package com.hackathon.service.LoginSignupServices;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.hackathon.Respositories.LoginSignupRepo.LoginSignupRepo;
import com.hackathon.models.LoginSignup.User;

@Service
public class LoginSignupService  {

	@Autowired
	LoginSignupRepo loginSignupRepo;
	
//	
//	public String signUp(User user)
//	{
//		if (loginSignupRepo.findByName( user.getName())!=null)
//		{
//			return "Username is already taken ";
//			
//		}
//		user
//		return "" ;
//		
//	}
//	
	
	
	
	
}
