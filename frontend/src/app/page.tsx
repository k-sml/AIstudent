"use client"
import { Container, CssBaseline, Typography } from "@mui/material"
import React from "react"

const HomePage: React.FC = () => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography>新規講義登録ボタンから講義を開始しよう</Typography>
    </Container>
  )
}

export default HomePage;