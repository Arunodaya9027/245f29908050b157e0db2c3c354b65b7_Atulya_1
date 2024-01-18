package com.hackathon.model.postmodel;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class postmodel {
	
	
	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Id
	private Long id;
	
	private String title;

	
	private String description;




	


	public postmodel(Long id, String title, String description) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
	}


	


	public Long getId() {
		return id;
	}





	public void setId(Long id) {
		this.id = id;
	}





	public String getTitle() {
		return title;
	}





	public void setTitle(String title) {
		this.title = title;
	}





	public String getDescription() {
		return description;
	}





	public void setDescription(String description) {
		this.description = description;
	}





	


	



	@Override
	public String toString() {
		return "postmodel [id=" + id + ", title=" + title + ", description=" + description + "]";
	}
	
	
	public postmodel() {
		super();
		// TODO Auto-generated constructor stub
	}


	
	
	
	
	
	
	
}

