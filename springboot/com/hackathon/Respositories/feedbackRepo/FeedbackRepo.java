package com.hackathon.Respositories.feedbackRepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.models.feedback_Models.Feedback;

@Repository
public interface FeedbackRepo extends JpaRepository<Feedback, Long> {

	
	
}
