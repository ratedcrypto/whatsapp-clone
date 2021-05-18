import Head from 'next/head';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar';
import { db, auth } from '../../firebase';
import getRecipientEmail from '../../utils/getRecipientEmail';
import { useState } from 'react';

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);
  const [opened, setOpened] = useState(false);

  const openedChat = () => {
    setOpened(true);
  };

  return (
    <Container>
      <Head>
        <title>Chat with {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer onClick={openedChat}>
        <ChatScreen chat={chat} messages={messages} opened={opened} />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

// Pre-fetch chat. Server side rendered.
export async function getServerSideProps(context) {
  const ref = db.collection('chats').doc(context.query.id);

  const messagesRes = await ref
    .collection('messages')
    .orderBy('timestamp', 'asc')
    .get();

  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  // Prepare the chat
  const chatRes = await ref.get();

  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      chat,
      messages: JSON.stringify(messages),
    }, // will be passed to the page component as props
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;

  ::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`;
