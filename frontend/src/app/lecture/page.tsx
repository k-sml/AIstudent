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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const topicData = { title: topic, explain: explanation, target: level, user_id: session?.user.id };
    try {
      const response = await apiClient.post('/api/topic', topicData);
      // APIの応答を新しいメッセージ形式に変換（例）
      const newMessage: ChatMessage[] = [
        { role: 'system', content: `あなたは${level}の立場から今から与えるタイトルに関する説明を受け、疑問に思うことかさらに深く聞きたいことを1つ具体的にかつ簡潔に出力して下さい。\n最終的な目的は説明をしてくる相手と3回のやりとりを通じて、相手がタイトルに関する理解が確かなものかどうか確認することです。\n` },
        { role: 'user', content: `${topic}に関する説明を今から行います。\n${explanation}` },
        { role: 'assistant', content: response.data[0].choices[0].message.content },
      ];
      const question_id = response.data[1];

      setMessages(newMessage);
      setQuestionID(question_id);
    }
    catch (e) {
      console.log(e);
    }
  }

  const handleSendAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      const userAnswer: ChatMessage = {
        role: 'user',
        content: answer,
      };
      const answerData = { user_id: session?.user.id, question_id: questionId, content: answer, messages: messages };
      try {
        const response = await apiClient.post('/api/answer', answerData);
        const nextQuestion: ChatMessage = {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        };
        setMessages([...messages, userAnswer, nextQuestion]);
        setAnswer(''); // 解答欄をクリア
      }
      catch (e) {
        console.log(e);
      }
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
            <MenuItem value={'Students who know nothing'}>学生</MenuItem>
            <MenuItem value={'Ordinary people who know common sense'}>一般人</MenuItem>
            <MenuItem value={'Someone who has general knowledge of the field'}>同業者</MenuItem>
            <MenuItem value={'Almighty God'}>プロフェッショナル</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#0099FF' }} fullWidth type="submit">
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
      <Box mb={2} onSubmit={handleSendAnswer} component="form">
        {messages.length > 0 && (
          <>
            <TextField
              fullWidth
              label="回答を入力"
              variant="outlined"
              margin="normal"
              multiline
              rows={4}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <Button
              variant="contained"
              sx={{ backgroundColor: '#00CC99', mt: 1 }} // 送信ボタンの上のマージンもここで設定
              fullWidth
              type="submit"
            >
              解答を送信
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
}
