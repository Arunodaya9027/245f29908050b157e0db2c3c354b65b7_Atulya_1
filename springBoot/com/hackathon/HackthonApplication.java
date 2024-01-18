package com.hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.hackathon")
public class HackthonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HackthonApplication.class, args);
	}

}
