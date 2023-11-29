import { Text, Box } from '@mantine/core';

export default function ChatMessagesMA({ messages }) {
  return (
    <Box>
      {messages.map((message, index) => (
        <Box key={index} align={message.sender === 'me' ? 'right' : 'left'}>
          <Text color={message.sender === 'me' ? '#862E9C' : 'black'}>
            {message.text}
          </Text>
          <Text size={'0.75rem'}>{message.timestamp}</Text>
        </Box>
      ))}
    </Box>
  );
}
