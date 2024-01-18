package com.hackathon.service.cloudservice;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class CloudinaryUploadService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadFile(MultipartFile file ,String title, String description) throws IOException {
    	Map<?, ?> params = ObjectUtils.asMap(
                "title", title,
                "description", description
                // Add any other metadata fields as needed
        );
    	
    	
    	Map<?, ?> result = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        String publicId = (String) result.get("public_id");
        String secureUrl = (String) result.get("secure_url");
        
        return (String) result.get("secure_url");
        
       }
    public List<Map<?, ?>> getAllData() throws Exception {
        // Fetch all resources without specifying a specific sorting order
        Map<?, ?> result = cloudinary.api().resources(
                ObjectUtils.asMap("type", "upload","context",true));
        String secureUrl = (String) result.get("secure_url");
        
        // Extract the list of resources
        return (List<Map<?, ?>>) result.get("resources");
    }
    
    
}
