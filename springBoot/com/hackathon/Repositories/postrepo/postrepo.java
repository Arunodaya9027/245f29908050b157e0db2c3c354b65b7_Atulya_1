package com.hackathon.Repositories.postrepo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hackathon.model.postmodel.postmodel;

@Repository
public interface postrepo extends JpaRepository<postmodel, String> {
	
	

}
