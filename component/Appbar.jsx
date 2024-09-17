import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Appbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user profile from the backend
    axios.get('http://localhost:3000/api/v1/user/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
    .then(response => {
      setUser(response.data.user); // Set the fetched user data to the state
    })
    .catch(error => {
      console.error('Error fetching user profile:', error);
    });
  }, []);

  const userName = user ? `${user.firstName} ${user.lastName}` : "User";
  const userInitial = user ? user.firstName[0].toUpperCase() : "U";

  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      <div className="flex items-center h-full">
        <div className="text-lg font-bold">
          PayTM App
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-sm mr-4">
          Hello, {userName}
        </div>
        <div className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center">
          <div className="text-xl font-bold">
            {userInitial}
          </div>
        </div>
      </div>
    </div>
  );
};