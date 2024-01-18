package com.hackathon.service.postservice;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hackathon.Repositories.postrepo.postrepo;
import com.hackathon.model.postmodel.postmodel;
import com.hackathon.models.feedback_Models.Feedback;

@Service
public class postservice {

	@Autowired
postrepo postrepo;
	
public List<postmodel> getAllpostList(){
		
		return postrepo.findAll();
	
}


public  void savePost(postmodel postmodel) {
	
	postrepo.save(postmodel);
	
}


	
	
}
