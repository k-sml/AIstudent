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
  Avatar,
  Stack,
  Paper,
} from '@mui/material';
import Person3RoundedIcon from '@mui/icons-material/Person3Rounded';
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [explanation, setExplanation] = useState<string>('');
  const [apiMessages, setApiMessages] = useState<ChatMessage[]>([]);
  const [topicID, setTopicID] = useState<string>('');
  const [questionId, setQuestionID] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const { data: session } = useSession();
  const handleChangeLevel = (event: SelectChangeEvent<string>) => {
    setLevel(event.target.value);
  }
  const [score, setScore] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const topicData = { title: topic, explain: explanation, target: level, user_id: session?.user.id };
    const TopicMessage:ChatMessage[] = [
       { role: 'system', content: `あなたは${level}の立場から今から与えるトピックとそれに関する説明に対して、聞きたいことを1つだけ具体的にかつ簡潔に出力して下さい。\n最終的な目的は説明をしてくる相手と5回のやりとりを通じて、相手がタイトルに関する理解が確かなものかどうか確認することです。\n` },
        // { role: 'system', content: `You are to take the position of level ${level} and receive an explanation about the given title. After hearing the explanation, you are to ask only one specific and concise question that has a definitive answer. Please answer in Japanese. format is like "~~は~~ですか？"` },
        // { role: 'system', content: `You are a ${level}. Please limit your knowledge to a ${level} level. I will now provide an explanation about a certain topic. After listening to the explanation, output only one short specific point of interest in the format '~~は~~ですか?'. I am not asking you a question. Please make an only one onequestion.` },
        // { role: 'system', content: `You are a ${level}. Please limit your knowledge to a ${level} level. Please make only "one" question about topic and explanation which user serve later.` },
        { role: 'user', content: `topic: ${topic}\nexplanation: ${explanation}` },
      ];
    setApiMessages(TopicMessage);
    try {
      setIsLoading(true);
      const response = await apiClient.post('/api/topic', topicData);
      const question_id = response.data[1];
      const topic_id = response.data[2];
      // APIの応答を新しいメッセージ形式に変換（例）
      const responseMessage: ChatMessage = { 
        role: 'assistant',
        content: response.data[0].choices[0].message.content,
      }
      setApiMessages([...TopicMessage,responseMessage]);
      setQuestionID(question_id);
      setTopicID(topic_id);
    }
    catch (e) {
      console.log(e);
    }
    finally { 
      setIsLoading(false);
    }
  }

  const handleSendAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (answer.trim()) {
      const userAnswer: ChatMessage = {
        role: 'user',
        content: answer,
      };
      setApiMessages(prevMessages => [...prevMessages, userAnswer]);
      setAnswer(''); // 解答欄をクリア
      const answerData = { user_id: session?.user.id, question_id: questionId, content: answer, messages: apiMessages };
      try {
        setIsLoading(true);
        const response = await apiClient.post('/api/answer', answerData);
        const nextQuestion: ChatMessage = {
          role: 'assistant',
          content: response.data.choices[0].message.content,
        };
        setApiMessages(prevMessages => [...prevMessages, nextQuestion]);
        
      }
      catch (e) {
        console.log(e);
      }
      finally {
        setIsLoading(false);
      }
    }
  }

  const handleGetEvaluation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const evaluationData = { user_id: session?.user.id, topic_id: topicID, res: apiMessages }
    try {
      const response = await apiClient.post('/api/evaluation', evaluationData);
      setScore(response.data.choices[0].message.content);
      const lastMessage: ChatMessage = {
        role: 'assistant',
        content: `${response.data.choices[0].message.content}点です`,
      }
      setApiMessages([...apiMessages, lastMessage]);
    }
    catch (e) {
      console.log(e);
    }
    setIsLoading(false);
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
          disabled={apiMessages.length > 0}
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
          disabled={apiMessages.length > 0}
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
            disabled={apiMessages.length > 0}
            required
          >
            <MenuItem value={'Students who know nothing'}>学生</MenuItem>
            <MenuItem value={'Ordinary people who know common sense'}>一般人</MenuItem>
            <MenuItem value={'Someone who has general knowledge of the field'}>同業者</MenuItem>
            <MenuItem value={'Almighty God'}>プロフェッショナル</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" sx={{ backgroundColor: '#0099FF' }} fullWidth type="submit" disabled={apiMessages.length > 0 || isLoading}>
          送信
        </Button>
      </Box>
      <Divider />
      <Box>
      {apiMessages.map((apiMessage, index) => (
        (apiMessage.role === "assistant" || apiMessage.role === "user") && (
          <Box key={index}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: apiMessage.role === "user" ? 'flex-end' : 'flex-start', py: 1.0 }}>
              <Stack direction="row" spacing={2} py={2}>
                <Avatar src="../../../public/assets/ai.jpg" />
                <Box fontWeight="fontWeightBold" sx={{ pt: 1.0 }}>
                  {apiMessage.role}
                </Box>
              </Stack>
              <Paper elevation={3} sx={{ p: 1.0, maxWidth: '80%' }}>
                {index === 1 ? `${topic}についての説明を行います\n ${explanation}` : apiMessage.content}
              </Paper>
            </Box>
          </Box>
          )
        ))}
      {isLoading && (
        <Box>
          <Stack direction="row" spacing={2} py={2}>
            <Avatar src="../../../public/assets/ai.jpg" />
            <Box fontWeight="fontWeightBold" sx={{ pt: 1.0 }}>
              {'assistant'}
            </Box>
          </Stack>
          <Paper elevation={3} sx={{ p: 1.0, maxWidth: '80%' }}>
            AIが考え中です...
          </Paper>
        </Box>
      )}
      </Box>

      {apiMessages.length <= 8 ? (
        <Box mb={2} onSubmit={handleSendAnswer} component="form">
          {apiMessages.length > 0 && (
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
                disabled={isLoading}
              >
                解答を送信
              </Button>
            </>
          )}
        </Box>
      ) : (
        <>
          {!score && (
            <Box mb={2} onSubmit={handleGetEvaluation} component="form">
              <>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: '#00CC99', mt: 1 }} // 送信ボタンの上のマージンもここで設定                fullWidth
                  type="submit"
                  disabled={isLoading}
                >
                  評価をもらう
                </Button>
              </>
            </Box>
          )}
        </>
      )}
    </Container>
  );
}
