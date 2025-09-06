'use client';

import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizontal, Bot } from 'lucide-react';

export default function ChatPanel() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I am your AI Habit Coach. How can I help you achieve your goals today?',
      },
    ],
  });

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)] bg-card rounded-4xl border shadow-lg">
      <div className="p-6 border-b">
        <h1 className="font-heading text-3xl font-bold">AI Coach</h1>
      </div>
      <ScrollArea className="flex-1 p-6">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-4xl bg-muted/50 border-2 border-dashed">
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-12 w-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold font-heading mb-4">Ready to Chat?</h2>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Ask me anything to help you build better habits!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex items-start gap-4 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role === 'assistant' && (
                  <Avatar className="w-10 h-10 border-2 border-primary/50">
                    <AvatarImage src="/ai-avatar.png" alt="AI Coach" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`px-5 py-3 rounded-3xl max-w-lg ${m.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'}`}>
                  <p className="text-lg">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 border-2 border-primary/50">
                  <AvatarImage src="/ai-avatar.png" alt="AI Coach" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="px-5 py-3 rounded-3xl bg-muted rounded-bl-none">
                  <div className="flex items-center space-x-2">
                    <span className="h-2.5 w-2.5 bg-muted-foreground/50 rounded-full animate-pulse"></span>
                    <span className="h-2.5 w-2.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                    <span className="h-2.5 w-2.5 bg-muted-foreground/50 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t bg-card rounded-b-4xl">
        <form onSubmit={handleSubmit} className="flex items-center space-x-4">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your AI coach anything..."
            disabled={isLoading}
            className="h-14 text-lg"
          />
          <Button type="submit" disabled={isLoading} size="icon" className="h-14 w-14 flex-shrink-0">
            <SendHorizontal className="h-6 w-6" />
          </Button>
        </form>
      </div>
    </div>
  );
}
