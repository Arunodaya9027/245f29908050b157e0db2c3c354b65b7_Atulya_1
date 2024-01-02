import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
function BillingInformation() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    videoUrl: "",
    audioUrl: "",
    imageUrl: "",
  });

  const handleInputChange = (field, value) => {
    setNewPost((prevPost) => ({ ...prevPost, [field]: value }));
  };

  const handleSubmit = () => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setNewPost({
      title: "",
      description: "",
      videoUrl: "",
      audioUrl: "",
      imageUrl: "",
    });
  };

  return (
    
    <Card style={{ width: "700px"}}>
      <CardContent>
        <Typography variant="h6">Create a Post</Typography>
        <TextField
          placeholder="Title"
          value={newPost.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          fullWidth
          style={{margin:"5px"}}
        /><br/>
        <TextField
          placeholder="Description"
          value={newPost.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          fullWidth
          style={{margin:"5px"}}
        /><br/><br/>
        <div style={{ display: "flex", gap: "8px" }}>
            <TextField
              placeholder="Video URL"
              value={newPost.videoUrl}
              onChange={(e) => handleInputChange("videoUrl", e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Audio URL"
              value={newPost.audioUrl}
              onChange={(e) => handleInputChange("audioUrl", e.target.value)}
              fullWidth
            />
            <TextField
              placeholder="Image URL"
              value={newPost.imageUrl}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              fullWidth
            />
          </div><br/>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </CardContent>
      {posts.map((post, index) => (
        <Card key={index} style={{ marginTop: "16px",width:"700px" }}>
          <CardContent>
            <Typography variant="h6">{post.title}</Typography>
            <Typography>{post.description}</Typography>
            {post.videoUrl && <CardMedia component="video" src={post.videoUrl} style={{width:"600px"}} controls />}
            {post.audioUrl && <CardMedia component="audio" src={post.audioUrl} style={{width:"600px"}} controls />}
            {post.imageUrl && <CardMedia component="img" src={post.imageUrl} style={{width:"600px"}} alt="Post" />}
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}

export default BillingInformation;
