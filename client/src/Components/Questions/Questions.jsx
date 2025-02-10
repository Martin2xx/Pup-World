import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default function Questions({ user }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('YOUR_BACKEND_URL/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`YOUR_BACKEND_URL/answers?question_id=${questionId}`);
      setAnswers((prev) => ({ ...prev, [questionId]: response.data }));
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const handleAnswerSubmit = async (event, questionId) => {
    event.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      await axios.post('YOUR_BACKEND_URL/answers', {
        question_id: questionId,
        user_id: user?.user_id,
        answer_body: newAnswer,
      });
      setNewAnswer('');
      fetchAnswers(questionId);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.question_id} className="question-box">
          <h4>{question.title}</h4>
          <Button variant="link" onClick={() => fetchAnswers(question.question_id)}>
            Show Answers
          </Button>
          <div>
            {answers[question.question_id]?.map((answer) => (
              <p key={answer.answer_id}>{answer.answer_body}</p>
            ))}
          </div>
          <Form onSubmit={(event) => handleAnswerSubmit(event, question.question_id)}>
            <Form.Control
              type="text"
              placeholder="Your answer..."
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      ))}
    </div>
  );
}
