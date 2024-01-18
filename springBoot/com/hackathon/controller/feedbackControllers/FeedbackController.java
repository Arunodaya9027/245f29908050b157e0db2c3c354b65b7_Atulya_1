package com.hackathon.controller.feedbackControllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.hackathon.controller.smsController.smsController;
import com.hackathon.models.feedback_Models.Feedback;
import com.hackathon.service.feedback_Services.Feedback_Services;
import com.hackathon.service.sms_Services.TwilioService;
import com.twilio.Twilio;

@RestController
@RequestMapping(value ="/api/feedbacks")
public class FeedbackController {

	@Autowired
	Feedback_Services feedback_Services;
	
	@Autowired 
	TwilioService twilioService;
	
	@Autowired 
	smsController smsController;
	
	
	
	@GetMapping
	public List<Feedback> getAllFeedbacks()   //  get the feedbacks as from db 
	
	{	
		System.out.println("get controller working ");
		return feedback_Services.getAllFeedbacks();
		
		
	}
	@PostMapping(value ="/save")
	public ResponseEntity<String> saveFeedback(@RequestBody Feedback feedback) {
		
		feedback_Services.saveFeedback(feedback);
		System.out.println("save controller working ");
		return ResponseEntity.ok("feedback saved sucessfully ");
	}
	
	

	
	//	@PostMapping("/save")
//	public ResponseEntity<String> saveFeedback(
//	        @RequestPart("police_range") String policeRange,
//	        @RequestPart("file") MultipartFile file) {
//	    // Your logic to handle policeRange (String) and file (MultipartFile)
//	    feedback_Services.saveFeedback(policeRange, file);
//	    System.out.println("save controller working ");
//	    return ResponseEntity.ok("feedback saved successfully ");
//	}

	
}
