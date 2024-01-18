package com.hackathon.service.feedback_Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackathon.Respositories.feedbackRepo.FeedbackRepo;
import com.hackathon.models.feedback_Models.Feedback;

@Service
public class Feedback_Services {
	
	
	@Autowired
	FeedbackRepo feedbackRepo;
	
	
	
	
public List<Feedback> getAllFeedbacks(){
		
		return feedbackRepo.findAll();
		
	}
public  void saveFeedback(Feedback feedback) {
	
	 feedbackRepo.save(feedback);
	
}
	
	
}
