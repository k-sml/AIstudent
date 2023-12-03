'use client'
import React, { useState } from 'react';
import { 
  Typography,
  Container,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Divider,
  List,
  ListItem,
  Card,
  CardContent,
} from '@mui/material';
import ChatBubble from '../../components/ChatBubble';
import { useSession } from 'next-auth/react';
import apiClient from '@/lib/apiClient';


interface ChatMessage {
  id: string;
  text: string;
  owner: 'ai' | 'user';
}

export default function App() {
  const [level, setLevel] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [answer, setAnswer] = useState<string>('');
  const { data: session } = useSession();
  const handleChangeLevel = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topicData = { title: topic, explain: explanation, target: level ,user_id: session?.user.id };
    try {
      const res = await apiClient.post('/api/topic', topicData); 
      console.log(res.data);
    }
    catch (e) {
      console.log(e);
    }
    // ここでバックエンドにお題、説明、レベルを送信し、最初の質問を取得します。
    // 以下はダミーの質問を追加するコードです。

    const firstQuestion: ChatMessage = {
      id: Math.random().toString(36).substring(2),
      text: "最初のバックエンドからの質問ですか？",
      owner: 'ai',
    };
    setMessages([...messages, firstQuestion]);
  }

  const handleSendAnswer = async () => {
    if (answer.trim()) {
      // ここでバックエンドに解答を送信し、次の質問を取得します。
      // 以下はダミーの次の質問を追加するコードです。
      const userAnswer: ChatMessage = {
        id: Math.random().toString(36).substring(2),
        text: answer,
        owner: 'user',
      };
      const nextQuestion: ChatMessage = {
        id: Math.random().toString(36).substring(2),
        text: "次のバックエンドからの質問ですか？",
        owner: 'ai',
      };
      setMessages([...messages, userAnswer, nextQuestion]);
      setAnswer(''); // 解答欄をクリア
    }
  }

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} my={4}> 
        <Typography variant="h6" component="h1" gutterBottom>
          {session?.user.name}による授業 その?
        </Typography>
        <TextField
          fullWidth
          label="お題"
          variant="outlined"
          margin="normal"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          disabled={messages.length > 0}
          required
        />
        <TextField
          fullWidth
          label="説明"
          variant="outlined"
          margin="normal"
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          multiline
          rows={4}
          disabled={messages.length > 0}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="level-select-label">相手のレベル</InputLabel>
          <Select
            labelId="level-select-label"
            id="level-select"
            value={level}
            label="相手のレベル"
            onChange={handleChangeLevel}
            disabled={messages.length > 0}
            required
          >
            <MenuItem value={'student'}>学生</MenuItem>
            <MenuItem value={'people'}>一般人</MenuItem>
            <MenuItem value={'professional'}>同業者</MenuItem>
            <MenuItem value={'god'}>プロフェッショナル</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#0099FF'}} fullWidth type="submit">
          送信
        </Button>
      </Box>
      <Divider />
      <List>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ChatBubble owner={message.owner}>
              {message.text}
            </ChatBubble>
          </ListItem>
        ))}
      </List>
      <Box mb={2}> {/* ここで最下部のマージンを追加します */}
        {messages.length > 0 && (
          <>
            <TextField
              fullWidth
              label="回答を入力"
              variant="outlined"
              margin="normal"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendAnswer();
                }
              }}
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00CC99', mt: 1 }} // 送信ボタンの上のマージンもここで設定
              fullWidth
              onClick={handleSendAnswer}
            >
              解答を送信
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
