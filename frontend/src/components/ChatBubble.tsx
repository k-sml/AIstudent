import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ChatBubbleProps {
  owner: 'ai' | 'user';
}

const ChatBubble = styled(Paper)<ChatBubbleProps>(({ theme, owner }) => ({
  maxWidth: '80%',
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  marginLeft: owner === 'ai' ? 0 : 'auto',
  marginRight: owner === 'user' ? 0 : 'auto',
  textAlign: owner === 'user' ? 'right' : 'left',
  backgroundColor: owner === 'ai' ? theme.palette.grey[100] : theme.palette.primary.light,
  color: theme.palette.text.primary,
}));

export default ChatBubble;
