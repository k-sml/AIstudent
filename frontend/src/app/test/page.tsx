'use client'
import React, { useEffect } from 'react'
import apiClient from '@/lib/apiClient'

useEffect(() => {
  const testData = async() => {
    const response = await apiClient.get('/Hello');   
  }
}, [])

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
