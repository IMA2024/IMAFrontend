import { useState } from 'react';
import { TextInput, Flex } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

export default function ChatInputMA({ onMessageSubmit }) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendClick = () => {
    if (inputValue.trim() !== '') {
      onMessageSubmit({ text: inputValue, sender: 'me', timestamp: new Date().toLocaleTimeString() });
      setInputValue('');
    }
  };

  const rightSection = (
    <Flex align="center">
      <IconSend onClick={handleSendClick} color="#862E9C" size="1.5rem" />
    </Flex>
  );

  return (
    <TextInput
      placeholder="Type Message"
      value={inputValue}
      onChange={handleChange}
      rightSectionWidth={90}
      rightSection={rightSection}
    />
  );
}
