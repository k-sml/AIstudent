'use client'
import React, { useEffect } from 'react';
import apiClient from '@/lib/apiClient';
import Button from '@mui/material/Button';


const Page = () => {
  // useEffect(() => {
  //   const testData = async () => {
  //     const response = await apiClient.get('/');
  //     console.log(response);
  //   };
  //   testData();
  // }, []);

  return (
    <div>
      <Button color="inherit" >
          新規講義
        </Button>
      
    </div>
  );
};

export default Page;