const API_ROOT = 'http://localhost:3000';

const token = localStorage.getItem("jwt")

const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
  };

  