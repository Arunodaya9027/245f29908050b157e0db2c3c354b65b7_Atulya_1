package com.hackathon.service.sms_Services;


import com.twilio.Twilio; import com.twilio.rest.api.v2010.account.Message;
 import com.twilio.type.PhoneNumber; import
 org.springframework.beans.factory.annotation.Value; import
 org.springframework.stereotype.Service;
 @Service public class TwilioService {

@Value("${twilio.account-sid}") private String accountSid;

 @Value("${twilio.auth-token}") private String authToken;
 
 @Value("${twilio.phone-number}") private String twilioPhoneNumber;

 public void sendSms(String toPhoneNumber, String polstation) {
	Twilio.init(accountSid, authToken);
 
Message.creator(new PhoneNumber(toPhoneNumber), new
 PhoneNumber(twilioPhoneNumber),
" राजस्थान पुलिस विभाग फीडबैक सिस्टम में आपका स्वागत है "+" .\n"
 +"आपसे अनुरोध है कि कृपया यूआरएल पर क्लिक करके फीडबैक फॉर्म भरें " +""
 +"फीडबैक फॉर्म भरना अनिवार्य है। .\nसादर +"
 + "google form :  https://forms.gle/swmdip2zWFkWNCtM6 "+ "\n WhatsApp Bot " + 
  " https://wa.me/+1(555)0937737?text=namaste%20sir " + "\nWebsite: "+ "\n"
  		+ " http://localhost:3000 ").create();


}
}



		 
//		 // You can log or handle the success here if needed
//		  System.out.println("SMS sent successfully. SID: " + twilioMessage.getSid());
//		  } catch (Exception e) { 
//			  // Handle the exception, log, or throw it further as needed 
//		  System.err.println("Error sending SMS: " + e.getMessage()); } } }
		 


//विज़िट करने के लिए आपका शुक्रिया"+polstation+"


///*
// * import com.twilio.Twilio; import com.twilio.rest.api.v2010.account.Message;
// * import com.twilio.type.PhoneNumber; import
// * org.springframework.beans.factory.annotation.Value; import
// * org.springframework.stereotype.Service;
// * 
// * @Service public class TwilioService {
// * 
// * @Value("${twilio.account-sid}") private String accountSid;
// * 
// * @Value("${twilio.auth-token}") private String authToken;
// * 
// * @Value("${twilio.phone-number}") private String twilioPhoneNumber;
// * 
// * public void sendSms(String toPhoneNumber, String polstation) {
// * Twilio.init(accountSid, authToken);
// * 
// * Message.creator(new PhoneNumber(toPhoneNumber), new
// * PhoneNumber(twilioPhoneNumber),
// * " राजस्थान पुलिस विभाग फीडबैक सिस्टम में आपका स्वागत है "+" .\n"
// * +"आपसे अनुरोध है कि कृपया यूआरएल पर क्लिक करके फीडबैक फॉर्म भरें " +""
// * +"फीडबैक फॉर्म भरना अनिवार्य है। .\nसादर").create();
// * 
// * 
// * 
// * 
// * 
// * 
// * 
// * 
// * 
// * 
// * 
// * } }
// */





