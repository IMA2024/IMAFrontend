import React, { useState } from 'react';
import { Image, TextInput, Button, Box, createStyles, Paper, Title, Divider, Select, Textarea, Text } from '@mantine/core';
// import ChatNavbarContent from './ChatNavbarContent';
// import ChatSearch from './ChatSearch';
// import ChatHeader from './ChatHeader';
// import ChatInput from './ChatInput';
// import ChatMessages from './ChatMessages';
import BusinessOwnerChatNavbarContent from './BusinessOwnerChatNavbar';
import BusinessOwnerChatSearch from './BusinessOnwnerChatSearch';
import BusinessOwnerChatHeader from './BusinessOwnerChatHeader';
import BusinessOwnerChatInput from './BusinessOwnerChatInput';
import BusinessOwnerChatMessages from './BusinessOwnerChatMessages';

const useStyles = createStyles((theme) => ({

  responsiveContainer: {
    width: '100%',
    height:'100%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor:'#E9ECEF',

    [theme.fn.smallerThan('sm')]: {
      flexDirection: 'column'
    },

  },

  responsiveChatSidebar: {
    width: '30%',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },

  },

  responsiveChatScreen: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor:'white',
    [theme.fn.smallerThan('sm')]: {
      width: '100%',
    },
  
  },

  responsiveChatHeader: {
    height:'15%',
    backgroundColor:'#5F3DC4',

  },

  responsiveChats: {
    height:'70%',
    margin:'20px',
  },

  responsiveChatInput: {
    height:'15%',
    backgroundColor:'#5F3DC4',
  },
  


}));

const ChatBusinessOwner = () => {
  const { classes } = useStyles();
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  return (
    <Box>
    <Title order={2} align="center" sx={{ fontWeight: 550 }} mb={5}>
      Chat
    </Title>
    <Box className={classes.responsiveContainer}>
      <Box className={classes.responsiveChatSidebar}>
        <BusinessOwnerChatSearch />
        <BusinessOwnerChatNavbarContent onContactSelect={handleContactSelect} />
      </Box>
      <Box className={classes.responsiveChatScreen}>
        <Box className={classes.responsiveChatHeader}>
          <BusinessOwnerChatHeader selectedContact={selectedContact} />
        </Box>
        <Box className={classes.responsiveChats}>
          <BusinessOwnerChatMessages messages={messages} />
        </Box>
        <Box p={'md'} className={classes.responsiveChatInput}>
          <BusinessOwnerChatInput onMessageSubmit={addMessage} />
        </Box>
      </Box>
    </Box>
  </Box>
);
};


export default ChatBusinessOwner