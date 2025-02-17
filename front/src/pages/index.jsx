import React, { useEffect, useContext } from "react";
import { useRouter } from 'next/router';
import { AuthContext } from '../context/AuthContext';
import MainContainer from "@/components/UI/MainContainer";
import MainPage from "@/components/main/MainPage";

const HomePage = () => {
  const { token, loading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.push('/login');
    }
  }, [token, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking token
  }

  return (
    <MainContainer>
      <MainPage></MainPage>
    </MainContainer>
  );
};

export default HomePage;
