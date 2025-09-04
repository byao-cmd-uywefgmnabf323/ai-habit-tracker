'use client';

import { useChat } from '@ai-sdk/react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ChatPanel() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    initialMessages: [
      {
        id: '1',
        role: 'assistant',
        content: 'Hello! I am your AI Habit Coach. How can I help you today?',
      },
    ],
  });

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
              <h2 className="text-2xl font-bold">AI Habit Coach</h2>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
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
                  <Avatar>
                    <AvatarImage src="/ai-avatar.png" alt="AI Coach" />
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-3 rounded-lg max-w-md ${m.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-200 dark:bg-gray-700'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/ai-avatar.png" alt="AI Coach" />
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
                <div className="p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
                  <div className="flex items-center space-x-2">
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-75"></span>
                    <span className="h-2 w-2 bg-gray-500 rounded-full animate-pulse delay-150"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
      <div className="p-4 border-t bg-background">
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask your AI coach anything..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </div>
    </div>
  );
}
