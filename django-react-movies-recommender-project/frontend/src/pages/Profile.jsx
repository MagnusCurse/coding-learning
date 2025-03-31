import '../styles/Profile.css'
import React, { useState } from 'react';

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    nickname: 'MovieBuff123',
    bio: 'I love sci-fi and fantasy films!',
    avatar: 'path-to-avatar.jpg',
    location: 'San Francisco, CA',
    birthdate: '1990-01-01',
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // TODO: Add save logic (e.g., API call)
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    // TODO: handle avatar file upload
    // For now, just simulate a new avatar path
    const file = e.target.files[0];
    if (file) {
      setUserData((prevData) => ({
        ...prevData,
        avatar: URL.createObjectURL(file),
      }));
    }
  };

  return (
    <div className="user-profile-page">
      {/* Header/Banner */}
      <header className="profile-header">
        <h2>User Profile</h2>
      </header>

      {/* Profile Card */}
      <div className="profile-card">
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

        {/* Display or Edit Mode */}
        {!isEditing ? (
          <div className="profile-info">
            <h3>{userData.nickname}</h3>
            <p className="location">{userData.location}</p>
            <p className="bio">{userData.bio}</p>
            <button onClick={handleEditClick}>Edit Profile</button>
          </div>
        ) : (
          <div className="profile-edit-form">
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
              <button onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {/* Additional Sections */}
      <div className="additional-panels">
        {/* For example, a "My Watchlist" or "My Reviews" panel */}
        <section className="my-watchlist">
          <h3>My Watchlist</h3>
          {/* Render watchlist items here */}
        </section>
      </div>
    </div>
  );
}

export default UserProfile;
