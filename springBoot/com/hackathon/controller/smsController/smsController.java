package com.hackathon.controller.smsController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hackathon.service.sms_Services.TwilioService;

@RestController
public class smsController {

    @Autowired
    private TwilioService twilioService;

    @GetMapping("/send-sms")
    public String sendSms(
        @RequestParam(required = false, defaultValue = "+919058225122") String toPhoneNumber,
        @RequestParam(required = false, defaultValue = "Default message") String message) {
         System.out.println("sms  controller working ");
        twilioService.sendSms(toPhoneNumber, message);
        return "SMS sent successfully!";
    

    }

}






// @RequestParam String toPhoneNumber
// ,@RequestParam String polstation

// twilioService.sendSms("+919058225122","this is ishan ");

//@RequestParam("toPhoneNumber") String toPhoneNumber,
//@RequestParam("message") String message




























/*
*
* import org.springframework.beans.factory.annotation.Autowired; import
* org.springframework.http.HttpStatus; import
* org.springframework.http.ResponseEntity; import
* org.springframework.web.bind.annotation.GetMapping; import
* org.springframework.web.bind.annotation.PostMapping; import
* org.springframework.web.bind.annotation.RequestParam; import
* org.springframework.web.bind.annotation.RestController;
* 
* import com.hackathon.service.TwilioService;
* 
* @RestController public class smsController {
* 
* 
* @Autowired private TwilioService twilioService;
* 
* // instance give spring ioc container
* 
* @GetMapping(value = "/send-sms") public ResponseEntity<String> sendsms
* (@RequestParam String phoneNumber , @RequestParam String message) {
* twilioService.sendSms(phoneNumber, message);
* System.out.println("sms conyroller working ");
* 
* return new
* ResponseEntity<String>("message sent sucessfully to sender number "
* ,HttpStatus.OK) ; }
* 
* 
* }
*/