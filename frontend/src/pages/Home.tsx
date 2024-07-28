import React from 'react';
import { useAuth } from '../context/AuthContext';
import UserTable from '../components/UserTable/UserTable';

const Home: React.FC = () => {
  const { user, logout } = useAuth();

  
  if (!user) {
    return <div>You need to log in to see this page.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Welcome, {user.name}</h1>
      <button onClick={logout} className="mb-4 bg-red-500 text-white py-2 px-4 rounded">
        Logout
      </button>
      <UserTable />
    </div>
  );
};

export default Home;
