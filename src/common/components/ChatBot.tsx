import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
import { useState } from 'react'

const API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY

interface IMessage {
    message: string,
    sender: 'user' | 'chatGPT',
    direction?: string
}

interface IChatRequest {
    role: 'user' | 'assistant',
    content: string
}

export const ChatBot = (): JSX.Element => {
    const [typing, setTyping] = useState(false)
    const [messages, setMessages] = useState<IMessage[]>([
        {
            message: "Hello",
            sender: 'chatGPT'
        }
    ])

    const handleSend = async (message: string) => {
        const newMessage: IMessage = {
            message: message,
            sender: 'user',
            direction: 'outgoing'
        }
        const newMessages: IMessage[] = [...messages, newMessage] 
        setMessages(newMessages)
        setTyping(true)
        await processMessageToChatGPT(newMessages)
    }

    const processMessageToChatGPT = async (chatMessages: IMessage[]) => {
        const convertedMessages: IChatRequest[] = chatMessages.map(msg => {
            const role = msg.sender === 'chatGPT' ? 'assistant' : msg.sender
            return {
                role: role,
                content: msg.message 
            }
        })

        const systemMessage = {
            role: 'system',
            content: 'Explain all concepts like I am 10 years old'
        }
        const requestBody = {
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...convertedMessages]
        }

        await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(response => response.json())
            .then(data => {
                const botResponseMessage = data.choices[0].message.content
                setMessages([
                    ...chatMessages,
                    {
                        message: botResponseMessage,
                        sender: 'chatGPT'
                    }
                ])
            }).finally(() => {
                setTyping(false)
            })
    }

    return (
        <div style={{ position: 'relative', height: '600px', width: '700px' }}>
            <MainContainer>
                <ChatContainer>
                    <MessageList
                        scrollBehavior='smooth'
                        typingIndicator={typing ? <TypingIndicator content='Bot is typing...' /> : null}
                    >
                        {/* @ts-ignore */}
                        {messages.map((message, index) => <Message key={index} model={message} />)}
                    </MessageList>
                    <MessageInput placeholder='Type...' onSend={handleSend} />
                </ChatContainer>
            </MainContainer>
        </div>
    )
}
