//package com.hackathon;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.SecurityBuilder;
//import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.web.DefaultSecurityFilterChain;
//
//import com.hackathon.service.LoginSignupServices.LoginSignupService;
//
//@Configuration
//@EnableWebSecurity
//public class AppSecurityConfig extends WebSecurity {
//	
//	
//	@Autowired
//    private LoginSignupService loginSignupService;
//
//   
//
////    @Override
////    protected void configure(HttpSecurity http) throws Exception {
////        http
////            .authorizeRequests()
////                .antMatchers("/api/users/signup").permitAll() // Allow access to signup endpoint without authentication
////                .anyRequest().authenticated() // Require authentication for other endpoints
////                .and()
////            .formLogin()
////                .loginPage("/login")
////                .permitAll()
////                .and() 
////            .logout()
////                .permitAll();
////    }
//	
//	
//	
//	
//
//    @Bean
//    public PasswordEncoder passwordEncoder() {
//        return new BCryptPasswordEncoder();
//    }
//}
