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
  role: 'system' | 'user' | 'assistant';
  content: string;
}


export default function App() {
  const [level, setLevel] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [questionId, setQuestionID] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const { data: session } = useSession();

  const handleChangeLevel = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value);
  }

  const handleSubmit = async () => {
    console.log(session);
    const topicData = { title: topic, explain: explanation, target: level, user_id: session?.user.id };
    console.log('topicData:', topicData);
    try {
      const response = await apiClient.post('/api/topic', topicData);
      console.log('response:', response);
      // APIの応答を新しいメッセージ形式に変換（例）
      const newMessage: ChatMessage = {
        role: 'assistant',
        content: response.data.choices[0].message.content,
      };
      const question_id = response.data.question_id;

      setMessages([...messages, newMessage]);
      setQuestionID(question_id);
    }
    catch (e) {
      console.log(e);
    }
  }

  // const handleSendAnswer = async () => {
  //   if (answer.trim()) {
  //     // ここでバックエンドに解答を送信し、次の質問を取得します。
  //     // 以下はダミーの次の質問を追加するコードです。
  //     const userAnswer: ChatMessage = {
  //       role: 'user',
  //       content: answer,
  //     };
  //     try {
  //       const res = await apiClient.post('/api/answer', user_id = data ? user.id,)
  //     }
  //     const nextQuestion: ChatMessage = {
  //       id: Math.random().toString(36).substring(2),
  //       text: "次のバックエンドからの質問ですか？",
  //       owner: 'ai',
  //     };
  //     setMessages([...messages, userAnswer, nextQuestion]);
  //     setAnswer(''); // 解答欄をクリア
  //   }
  // }

  return (
    <Container maxWidth="sm">
      <Box my={4}>
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
          >
            <MenuItem value={'student'}>学生</MenuItem>
            <MenuItem value={'people'}>一般人</MenuItem>
            <MenuItem value={'professional'}>同業者</MenuItem>
            <MenuItem value={'god'}>プロフェッショナル</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#0099FF' }} fullWidth onClick={handleSubmit}>
          送信
        </Button>
      </Box>
      <Divider />
      <List>
        {messages.map((message) => {
          if (message.role === "system") {
            return null
          }

          return (
            <ListItem>
              <ChatBubble owner={message.role}>
                {message.content}
              </ChatBubble>
            </ListItem>
          )
        })}
      </List>
      {/* <Box mb={2}> ここで最下部のマージンを追加します
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
      </Box> */}
    </Container>
  );
}
