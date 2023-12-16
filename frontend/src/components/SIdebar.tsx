"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import SettingsIcon from '@mui/icons-material/Settings';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PersonIcon from '@mui/icons-material/Person';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import apiClient from '@/lib/apiClient';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import { Badge } from '@mui/material';
// import { Topic } from '@mui/icons-material';
import { useState } from 'react';
import { Topic, TopicArray } from '@/type/topic';
import { isToday,isYesterday,isOneWeekAgo,isOneMonthAgo } from '@/app/utils/date';


const drawerWidth = 240;
export interface PersistentDrawerLeftProps {
  children: React.ReactNode;
}
const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


const PersistentDrawerLeft: React.FC<PersistentDrawerLeftProps> = ({ children }) => {
  const theme = useTheme();
  const { data: session } = useSession();
  const [topics, setTopics] = useState<{ today: Topic[]; yesterday: Topic[]; oneWeekAgo: Topic[]; oneMonthAgo: Topic[]; older: Topic[]; }>();

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const fetchTopics = async () => {
      try{
        const user_id = session?.user.id; // Assuming session?.user.id is your variable
        const categorizedData = {
          today: [] as Topic[],
          yesterday: [] as Topic[],
          oneWeekAgo: [] as Topic[],
          oneMonthAgo: [] as Topic[],
          older: [] as Topic[],
        };
        const res = await apiClient.get(`/api/myTopics/${user_id}`);
  
        res.data.map((topic:Topic) => {
          if(isToday(topic.created_at)){
            console.log(topic);
            categorizedData.today.push(topic);
          }else if(isYesterday(topic.created_at)){
            categorizedData.yesterday.push(topic);
          }else if(isOneWeekAgo(topic.created_at)){
            categorizedData.oneWeekAgo.push(topic);
          }else if(isOneMonthAgo(topic.created_at)){
            categorizedData.oneMonthAgo.push(topic);
          }else{
            categorizedData.older.push(topic);
          }
        });
        setTopics(categorizedData);
      }catch(e){
        console.log(e);
      }
    }
    fetchTopics();
  },[session])
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#0099FF' }}>
        <Toolbar>
          {session && (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AIstudent
          </Typography>
          {session && (
            <>
              <Button color="inherit" startIcon={<PersonIcon />}>
                {session?.user.name}
              </Button>
              <Button color="inherit" startIcon={<AddCircleOutlineIcon />} href='/lecture'>
                新規講義作成
              </Button>
              <Button color="inherit" startIcon={<SettingsIcon />}>
                設定
              </Button>
              <Button color="inherit" startIcon={<LogoutOutlinedIcon />} onClick={() => signOut()}>
                ログアウト
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="今日" />
          </ListItem>
          {topics?.today.map((topic, index) => (
      
            <ListItem key={topic.id} disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                  <Badge badgeContent={""} color="primary" variant="dot">
                    <ArticleOutlinedIcon />
                  </Badge>
                  </ListItemIcon>

                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>

          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="昨日" />
          </ListItem>
          {topics?.yesterday.map((topic, index) => (
            <ListItem key={topic.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="一週間前" />
          </ListItem>
          {topics?.oneWeekAgo.map((topic, index) => (
            <ListItem key={topic.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="一ヶ月前" />
          </ListItem>
          {topics?.oneMonthAgo.map((topic, index) => (
            <ListItem key={topic.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ArticleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={topic.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
export default PersistentDrawerLeft;