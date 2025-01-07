import React, { useContext, useEffect, useState } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Avatar,
  Divider
} from '@mui/material';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import axiosInstance from '../../../../libs/axios';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { countryCodeMap } from '../../../../constants/countryCode';

const EditProfilePage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
    bio: '',
    country: ''
  });

  const { playerId } = useParams();
  const token = localStorage.getItem('token');
  const auth = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);
  const [profilePicId, setProfilePicId] = useState('');
  const nav = useNavigate();
  const cld = new Cloudinary({ cloud: { cloudName: 'de26qjxpf' } });

  useEffect(() => {
    if (auth.userAuth.username !== playerId) {
      nav(`/edit-profile/${auth.userAuth.username}`);
    }
    setFormData(prevData => ({
      ...prevData,
      username: auth.userAuth.username,
      bio: auth.userAuth.bio || '',
      country: auth.userAuth.country || ''
    }));
  }, [auth, nav, playerId]);

  // Handle file upload for profile picture
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingProfilePic(true);

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
      setFormData((prevData) => ({
        ...prevData,
        profilePic: data.secure_url,
      }));
      setProfilePicId(data.public_id);
      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    } finally {
      setUploadingProfilePic(false);
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
      const response = await axiosInstance.patch('/auth/update-profile', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update local storage with new user data
      const updatedUser = response.data.player;
      const currentAuth = JSON.parse(localStorage.getItem('userAuth'));
      const newUserAuth = {
        ...currentAuth,
        username: updatedUser.username,
        profilePic: updatedUser.profilePicture,
        bio: updatedUser.bio,
        country: updatedUser.country
      };
      
      localStorage.setItem('userAuth', JSON.stringify(newUserAuth));
      
      // Update auth context
      auth.setUserAuth(newUserAuth);

      alert('Profile updated successfully!');
      nav(`/profile/${updatedUser.username}`);

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

  return (
    <Box className="min-h-screen bg-muted py-8">
      <Paper className="max-w-2xl mx-auto p-6 space-y-6">
        <Typography variant="h4" className="text-center mb-6">
          Edit Profile
        </Typography>

        <div className="space-y-6">
          {/* Profile Picture Section */}
          <Box className="flex items-center space-x-4">
            <Avatar
              src={formData.profilePic || auth.userAuth.profilePic}
              sx={{ width: 100, height: 100 }}
            />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Profile Picture
              </Typography>
              <Button
                variant="outlined"
                component="label"
                disabled={uploadingProfilePic}
              >
                {uploadingProfilePic ? 'Uploading...' : 'Change Profile Picture'}
                <input
                  type="file"
                  hidden
                  onChange={handleFileUpload}
                  accept="image/*"
                />
              </Button>
            </Box>
          </Box>

          <Divider />

          {/* User Details Section */}
          <div className="grid gap-4">
            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />

            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                name="country"
                value={formData.country}
                onChange={handleChange}
                label="Country"
              >
                {Object.keys(countryCodeMap).map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
          </div>

          <Box className="flex justify-end space-x-3">
            <Button
              variant="outlined"
              onClick={() => nav(`/profile/${auth.userAuth.username}`)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              disabled={isSubmitting || uploadingProfilePic}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </div>
      </Paper>
    </Box>
  );
};

export default EditProfilePage;
