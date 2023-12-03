'use client'
import React, { useState } from 'react';
import { Container, CssBaseline, Box, Typography, TextField, Button, Avatar, Grid, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation'

const SignUp: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここで新規登録処理を実装します
    try {
      await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        name:username,
        type:"signup",
      }).then((res) => {
        if (res?.error) {
          console.log(res.error);
        } else {
          router.push("/lecture");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const GoogleSingIn = async () => {
    try {
      await signIn('google', {}, { prompt: 'login' });
      router.push("/lecture");
    } catch (err) {
      console.log(err);
    }
  }

  

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

          <Grid item xs={12}>            
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                label="ユーザ名"
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="メールアドレス"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="パスワード"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            登録
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={GoogleSingIn} // Googleでサインイン
            >
            Googleでサインイン
            </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                すでにアカウントを持っている場合はこちら
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
