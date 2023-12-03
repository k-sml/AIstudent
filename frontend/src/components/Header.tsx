'use client'
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import useMediaQuery from '@mui/material/useMediaQuery';
import PersonIcon from '@mui/icons-material/Person';
import { useTheme } from '@mui/material/styles';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { data: session } = useSession();



  return (
    <AppBar position="static" sx={{ backgroundColor: '#0099FF'}}>
      <Toolbar>
        {isMobile && (
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AI student
          {/* {user?.name} */}
        </Typography>
        {!isMobile && (
          <>
            {session && (
            <>
              <Button color="inherit" startIcon={<PersonIcon/>}>
                {session?.user?.name}
              </Button>
              <Button color="inherit" startIcon={<AddCircleOutlineIcon />}>
                新規講義作成
              </Button>
              <Button color="inherit" startIcon={<SettingsIcon />}>
                設定
              </Button>
              <Button color="inherit" startIcon={<LogoutOutlinedIcon />} onClick={()=>signOut()}>
                ログアウト
              </Button>
            </>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
