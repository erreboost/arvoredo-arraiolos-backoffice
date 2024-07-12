'use client';
import {jwtDecode} from 'jwt-decode';
import React, {useEffect, useState} from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: any = jwtDecode(token);
      setUser(decoded);
    }
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <img
        src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`}
        alt="Profile Avatar"
      />
      <h1>{`${user.firstName} ${user.lastName}`}</h1>
      <p>Email: {user.email}</p>
      <p>User Group: {user.userGroup}</p>
      <p>User ID: {user.userId}</p>
    </div>
  );
}
