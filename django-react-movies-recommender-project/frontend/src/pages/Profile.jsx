import '../styles/Profile.css';
import api from "../api";
import defaultAvatar from '../assets/pic/default.png';
import React, { useState } from 'react';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nickname: 'MovieBuff',
    bio: 'I love sci-fi and fantasy films!',
    avatar: defaultAvatar,
    location: 'San Francisco, CA',
    birthdate: '1990-01-01',
  });

  const handleSaveClick = async () => {
    try {
      // prepare the data for the backend
      const updateData = {
        // map frontend field names to backend expectations
        nickname: userData.nickname,
        bio: userData.bio,
        avatar_url: userData.avatar, // assuming your backend expects 'avatar_url'
        location: userData.location,
        birth_date: userData.birthdate // match backend's birth_date field
      };

      const response = await api.patch('/api/user/profile/update/', 
        updateData);
  
      // update local state with the response data
      const updatedProfile = await response.data;
      
      setUserData(prev => ({
        ...prev,
        ...updatedProfile, // spread backend response
        // frontend (userData) and backend (Profile model) use slightly different field names
        birthdate: updatedProfile.birth_date,
        avatar: updatedProfile.avatar_url // fix field name mismatch
      }));
  
      setIsEditing(false);
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Update error:', error);
      alert(`Update failed: ${error.message}`);
    }
  };

  const handleEditClick = () => setIsEditing(true);

  const handleCancelClick = () => setIsEditing(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserData(prev => ({
        ...prev,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="user-profile-page">
      <header className="profile-header">
        <h2>User Profile</h2>
      </header>

      <div className="profile-card animated-card">
        <div className="avatar-section">
          <img src={userData.avatar} alt="User Avatar" className="avatar" />
          {isEditing && (
            <label className="avatar-edit-label">
              Change Avatar
              <input
                type="file"
                onChange={handleAvatarChange}
                style={{ display: 'none' }}
              />
            </label>
          )}
        </div>

        {!isEditing ? (
          <div className="profile-info">
            <h3>{userData.nickname}</h3>
            <p className="location">{userData.location}</p>
            <p className="bio">{userData.bio}</p>
            <button className="btn primary-btn" onClick={handleEditClick}>
              Edit Profile
            </button>
          </div>
        ) : (
          <div className="profile-edit-form animated-form">
            <div className="form-group">
              <label>Nickname</label>
              <input
                name="nickname"
                value={userData.nickname}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                name="location"
                value={userData.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Birthdate</label>
              <input
                type="date"
                name="birthdate"
                value={userData.birthdate}
                onChange={handleInputChange}
              />
            </div>
            <div className="button-row">
              <button className="btn success-btn" onClick={handleSaveClick}>
                Save
              </button>
              <button className="btn cancel-btn" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="additional-panels">
        <section className="my-watchlist">
          <h3>My Watchlist</h3>
          {/* Render watchlist items here */}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;