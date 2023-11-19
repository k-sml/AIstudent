'use client'
import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import Link from 'next/link';


export default function App() {

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

          <>
            <Typography component="h1" variant="h5">
              ようこそ
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Link href="/signup" passHref>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ mb: 2 }}
                >
                  新規登録
                </Button>
              </Link>
              <Link href="/auth/login" passHref>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ mb: 2 }}
                >
                  ログイン
                </Button>
              </Link>
            </Box>
          </>
        ) : (
          <Box sx={{ mt: 3 }}>
            <Link href="/lecture" passHref>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mb: 2, py: 2 }} // pyはpadding-y, Y軸方向のパディング
              >
                新規講義作成
              </Button>
            </Link>
          </Box>
        )
      </Box>
    </Container>
  );
}
