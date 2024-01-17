package com.hackathon.models.feedback_Models;

import org.springframework.boot.autoconfigure.domain.EntityScan;

import jakarta.annotation.Generated;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Feedback {
	
	 //  declaring primary keys in  enitity 
	// @GeneratedValue(strategy = GenerationType.IDENTITY)// unique 
	@Id	
	private long complaint_no;
	
	private String fullname;
	
	private String address;
	
	private String email;
	  
	private long phone_no;	
	
////	@ElementCollection
//	@OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
   private String police_range;
	
	
	
	
//	//@ElementCollection
//	@OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
	private String police_district;
	
	
//	//@ElementCollection
//	@OneToMany(mappedBy = "feedback", cascade = CascadeType.ALL)
	private String police_station;
	
	
	private String isComplaintheard;
	
	private double star_rating_type1;
	
	private double star_rating_type2;

	
	
	



	public double getStar_rating_type1() {
		return star_rating_type1;
	}



	public void setStar_rating_type1(double star_rating_type1) {
		this.star_rating_type1 = star_rating_type1;
	}



	public double getStar_rating_type2() {
		return star_rating_type2;
	}



	public void setStar_rating_type2(double star_rating_type2) {
		this.star_rating_type2 = star_rating_type2;
	}



	public void setPolice_range(String police_range) {
		this.police_range = police_range;
	}



	public void setPolice_district(String police_district) {
		this.police_district = police_district;
	}



	public void setPolice_station(String police_station) {
		this.police_station = police_station;
	}



	public Feedback(long complaint_no, String fullname, String address, String email, long phone_no,
	        String police_range, String police_district, String police_station, String isComplaintheard,
	        double star_rating_type1, double star_rating_type2) {
	    super();
	    this.complaint_no = complaint_no;
	    this.fullname = fullname;
	    this.address = address;
	    this.email = email;
	    this.phone_no = phone_no;
	    this.police_range = police_range;
	    this.police_district = police_district;
	    this.police_station = police_station;
	    this.isComplaintheard = isComplaintheard;
	    this.star_rating_type1 = star_rating_type1;
	    this.star_rating_type2 = star_rating_type2;
	}



	public long getComplaint_no() {
		return complaint_no;
	}



	public void setComplaint_no(long complaint_no) {
		this.complaint_no = complaint_no;
	}



	public String getFullname() {
		return fullname;
	}



	public void setFullname(String fullname) {
		this.fullname = fullname;
	}



	public String getAddress() {
		return address;
	}



	public void setAddress(String address) {
		this.address = address;
	}



	public String getEmail() {
		return email;
	}



	public void setEmail(String email) {
		this.email = email;
	}



	public long getPhone_no() {
		return phone_no;
	}



	public void setPhone_no(long phone_no) {
		this.phone_no = phone_no;
	}



	public String getIsComplaintheard() {
		return isComplaintheard;
	}



	public void setIsComplaintheard(String isComplaintheard) {
		this.isComplaintheard = isComplaintheard;
	}



	public String getPolice_range() {
		return police_range;
	}



	public String getPolice_district() {
		return police_district;
	}



	public String getPolice_station() {
		return police_station;
	}



	@Override
	public String toString() {
		System.out.println();
		return "Feedback [Complaint_no=" + complaint_no + ", Fullname=" + fullname + ", address=" + address + ", email="
				+ email + ", Phone_no=" + phone_no + ", police_range=" + police_range + ", police_district="
				+ police_district + ", police_station=" + police_station + ", isComplaintheard=" + isComplaintheard
				+ ", star_rating_type1=" + star_rating_type1 + ", star_rating_type2=" + star_rating_type2 + "]";

	
	}



	public Feedback() {
		super();
		// TODO Auto-generated constructor stub
	}



	
	
	
	
}
