import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import axiosInstance from '../../../../libs/axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';


const EditProfilePage = () => {
    const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword:'',
      profilePic: '',
      coverPic: '',
    });
    const {playerId}=useParams();
    const token = localStorage.getItem('token')
    const auth=useContext(AuthContext)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
    const [uploadingCoverPic, setUploadingCoverPic] = useState(false);
    const [profilePicId, setProfilePicId] = useState('');
    const [coverPicId, setCoverPicId] = useState('');
    const nav=useNavigate()
    const cld = new Cloudinary({ cloud: { cloudName: 'de26qjxpf' } });
    useEffect(()=>{
      if(auth.userAuth.username!=playerId){
        nav(`/edit-profile/${auth.userAuth.username}`)
      }
    setFormData((prevData)=>({...prevData,username:auth.userAuth.username}))
    },[auth, nav, playerId])
    // Handle file upload for profile picture
    const handleFileUpload = async (e, type) => {
      const file = e.target.files[0];
      if (!file) return;
  
      const isProfilePic = type === 'profilePic';
      isProfilePic ? setUploadingProfilePic(true) : setUploadingCoverPic(true);
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'TeamUp');
  
      try {
        const response = await axiosInstance.post(
          'https://api.cloudinary.com/v1_1/de26qjxpf/image/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
  
        const data = response.data;
  
        // Update the formData with the URLs
        if (isProfilePic) {
          setFormData((prevData) => ({
            ...prevData,
            profilePic: data.secure_url,
          }));
          setProfilePicId(data.public_id);
          alert('Profile picture uploaded successfully!');
        } else {
          setFormData((prevData) => ({
            ...prevData,
            coverPic: data.secure_url,
          }));
          setCoverPicId(data.public_id);
          alert('Cover picture uploaded successfully!');
        }
      } catch (error) {
        console.error(`Error uploading ${type}:`, error);
        alert(`Failed to upload ${type}. Please try again.`);
      } finally {
        isProfilePic ? setUploadingProfilePic(false) : setUploadingCoverPic(false);
      }
    };
  
    // Handle other form inputs
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
     const handleSave = async () => {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }

          setIsSubmitting(true);
           try {
             const response = await axiosInstance.put('/auth/update', formData,{headers: {
                Authorization: `Bearer ${token}`, // Include the auth token here
              },});
             console.log('Profile updated:', response.data);
             auth.upd
           alert('Profile updated successfully! Please Sign In Again');
           try{
            const response=await auth.signOut()
            console.log(response)
            nav('/auth')
           }catch(e){
             console.log(e.message)
           }
          } catch (error) {
               console.error('Error updating profile:', error);
             alert('Failed to update profile. Please try again.');
           } finally {
             setIsSubmitting(false);
            }
          };
    const transformedProfileImage = profilePicId
      ? cld.image(profilePicId).resize(auto().gravity(autoGravity()).width(500).height(500))
      : null;
  
    const transformedCoverImage = coverPicId
      ? cld.image(coverPicId).resize(auto().gravity(autoGravity()).width(500).height(500))
      : null;
  
    return (
      <Box
        sx={{
          maxWidth: 500,
          margin: '0 auto',
          padding: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" textAlign="center">
          Edit Profile
        </Typography>
  
        <TextField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
        />
      
        <TextField
          label="New Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
        />
  
        <Typography variant="body2">Profile Picture</Typography>
        <Button
          variant="contained"
          component="label"
          disabled={uploadingProfilePic}
        >
          Upload Profile Picture
          <input
            type="file"
            hidden
            onChange={(e) => handleFileUpload(e, 'profilePic')}
          />
        </Button>
        {uploadingProfilePic && <CircularProgress size={24} />}
        {transformedProfileImage && <AdvancedImage cldImg={transformedProfileImage} />}
  
        <Typography variant="body2">Cover Picture</Typography>
        <Button
          variant="contained"
          component="label"
          disabled={uploadingCoverPic}
        >
          Upload Cover Picture
          <input
            type="file"
            hidden
            onChange={(e) => handleFileUpload(e, 'coverPic')}
          />
        </Button>
        {uploadingCoverPic && <CircularProgress size={24} />}
        {transformedCoverImage && <AdvancedImage cldImg={transformedCoverImage} />}
  
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isSubmitting || uploadingProfilePic || uploadingCoverPic}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    );
  };
  
  export default EditProfilePage;
