'use client'
import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Doc {
    pageContent?: string;
    metadata?: {
        loc?: {
            pageNumber?: number;
        };
        source?: string;
    };
}

interface IMessage {
    role: 'assistant' | 'user';
    content?: string;
    documents?: Doc[];
}

const ChatComponent: React.FC = () => {
    const [message, setMessage] = React.useState<string>('');
    const [messages, setMessages] = React.useState<IMessage[]>([]);

    const handleSendChatMessage = async () => {
        setMessages((prev) => [...prev, {role: 'user', content: message}]);
        const response = await fetch(`http://localhost:8000/chat?message=${encodeURIComponent(message)}`);
        const data = await response.json();
        console.log(data);
        setMessages((prev) => [...prev, {role: 'assistant', content: data?.message, documents: data?.docs}]);
    };
    return (
        <div className='p-4'>
            <div>
                {messages.map((message, index) => <pre key={index}>{JSON.stringify(message, null, 2)}</pre>)}
            </div>
            <div className='flex gap-4'>
                <Input value = {message} onChange = {(e) => setMessage(e.target.value)}
                placeholder='Type your message here'/>
                <Button onClick = {handleSendChatMessage} disabled = {!message.trim()}>Send</Button>
            </div>

        </div>
    )
};

export default ChatComponent;