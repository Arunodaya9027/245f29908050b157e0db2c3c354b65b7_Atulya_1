//package com.hackathon.controller.AwsS3Controller;
//
//import com.hackathon.service.AwsService.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.awt.*;
//import java.util.List;
//
//import static java.net.HttpURLConnection.HTTP_OK;
//
//@RestController
//@RequestMapping(value = "/api")
//public class AwsController {
//
//
//    @Autowired
//    private S3Service s3Service;;
//
//    @PostMapping(value = "/upload")
//    public String upload(@RequestParam("file") MultipartFile file){
//       return s3Service.saveFile(file);
//    }
//
//    @GetMapping(value = "download/{filename}")
//    public ResponseEntity<byte[]> download(@PathVariable("filename") String filename){
//        HttpHeaders headers=new HttpHeaders();
//        headers.add("Content-type", MediaType.ALL_VALUE);
//        headers.add("Content-Disposition", "attachment; filename="+filename);
//        byte[] bytes = s3Service.downloadFile(filename);
//        return  ResponseEntity.status(HTTP_OK).headers(headers).body(bytes);
//    }
//
//
//    @DeleteMapping("{filename}")
//    public  String deleteFile(@PathVariable("filename") String filename){
//       return s3Service.deleteFile(filename);
//    }
//
//    @GetMapping("list")
//    public List<String> getAllFiles(){
//
//        return s3Service.listAllFiles();
//
//    }
//}
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
///*
// * //S3Controller.java import
// * org.springframework.beans.factory.annotation.Autowired; import
// * org.springframework.beans.factory.annotation.Value; import
// * org.springframework.http.ResponseEntity; import
// * org.springframework.web.bind.annotation.*; import
// * org.springframework.web.multipart.MultipartFile;
// * 
// * import com.hackathon.service.AwsService.S3DownloadService; import
// * com.hackathon.service.AwsService.S3UploadService;
// * 
// * import java.io.IOException;
// * 
// * @RestController
// * 
// * @RequestMapping("/api/s3") public class AwsController {
// * 
// * @Autowired private S3UploadService uploadService;
// * 
// * @Autowired private S3DownloadService downloadService;
// * 
// * @Value("${aws.bucketName}") private String defaultBucketName;
// * 
// * @Value("${aws.accessKeyId}") private String accessKeyId; // @RequestParam
// * String bucketName // @RequestParam String key,
// * 
// * 
// * @PostMapping("/upload") public ResponseEntity<String>
// * uploadFile( @RequestParam MultipartFile file) { try {
// * uploadService.uploadFile(defaultBucketName, accessKeyId, file); return
// * ResponseEntity.ok("File uploaded successfully!"); } catch (IOException e) {
// * e.printStackTrace(); return
// * ResponseEntity.status(500).body("Error uploading file."); } }
// * 
// * @GetMapping("/download") public ResponseEntity<byte[]>
// * downloadFile( @RequestParam MultipartFile file) { try { byte[] fileBytes =
// * downloadService.downloadFile(defaultBucketName, accessKeyId); return
// * ResponseEntity.ok().body(fileBytes); } catch (IOException e) {
// * e.printStackTrace(); return ResponseEntity.status(500).body(null); } } }
// */