import { useState } from 'react';
import { Search, Send, Image, Smile, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import MessageItem from '@/components/MessageItem';
import useWindowSize from '@/hooks/useWindowSize';
import { toast } from 'sonner';

// Mock data for messages
const mockMessages = [
  {
    id: '1',
    userId: '1',
    name: 'Eduardah',
    image: '/lovable-uploads/7205855e-5f82-453b-9efb-b9cf8b67bbd3.png',
    lastMessage: "Hi there! How are you today?",
    timestamp: '1 minute ago',
    isRead: false,
    isOnline: true,
    isPremium: true,
    isVerified: true,
  },
  {
    id: '2',
    userId: '2',
    name: 'Loirinha',
    image: '/lovable-uploads/d75d8be6-fbdf-49a2-9880-190c34b0748f.png',
    lastMessage: "Thanks for the message! I'll check it out.",
    timestamp: '1 minute ago',
    isRead: true,
    isOnline: false,
    isPremium: true,
    isVerified: true,
    isFavorite: true,
  },
  {
    id: '3',
    userId: '3',
    name: 'Vanessa',
    image: '/lovable-uploads/3b14247a-0fb7-43f6-9107-08f292b71528.png',
    lastMessage: "Did you see the new photo I uploaded?",
    timestamp: '1 minute ago',
    isRead: true,
    isOnline: false,
    isPremium: false,
  },
];

// Mock conversation data
const mockConversation = [
  {
    id: '1',
    senderId: '1',
    text: "Hey! How are you today?",
    timestamp: '1 minute ago',
  },
  {
    id: '2',
    senderId: 'me',
    text: "I'm doing great, thanks for asking! How about you?",
    timestamp: '1 minute ago',
  },
  {
    id: '3',
    senderId: '1',
    text: "I'm good too. What are you up to this weekend?",
    timestamp: '1 minute ago',
  },
];

const Messages = () => {
  const { isMobile } = useWindowSize();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(mockMessages);
  
  const activeUser = conversations.find(convo => convo.id === activeConversation);
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const filtered = mockMessages.filter(msg => 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setConversations(filtered);
  };
  
  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText.trim()) return;
    
    toast.success('Message sent successfully');
    setMessageText('');
  };
  
  const handleSelectConversation = (id: string) => {
    setActiveConversation(id);
  };
  
  const handleBackToList = () => {
    setActiveConversation(null);
  };
  
  // Filter messages based on search
  const filteredConversations = searchQuery
    ? conversations.filter(msg => 
        msg.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;
  
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="container mx-auto py-6 px-0 md:px-4 animate-fade-in">
        <div className="glass-card rounded-none md:rounded-xl overflow-hidden">
          <div className="flex h-[calc(100vh-10rem)]">
            {/* Conversations List (hidden on mobile when a conversation is active) */}
            {(!isMobile || (isMobile && !activeConversation)) && (
              <div className="w-full md:w-1/3 border-r border-slate-200 flex flex-col">
                <div className="p-3 border-b border-slate-200">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search messages..."
                        className="input-field pl-10 py-2"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                    </div>
                  </form>
                </div>
                
                <div className="overflow-y-auto flex-grow">
                  {filteredConversations.length > 0 ? (
                    filteredConversations.map((message) => (
                      <MessageItem
                        key={message.id}
                        {...message}
                        onClick={() => handleSelectConversation(message.id)}
                      />
                    ))
                  ) : (
                    <div className="text-center py-8 text-slate-500">
                      <p>No conversations found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Conversation Area (or placeholder) */}
            {(!isMobile || (isMobile && activeConversation)) && (
              <div className="w-full md:w-2/3 flex flex-col bg-slate-50">
                {activeConversation && activeUser ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-3 border-b border-slate-200 bg-white flex items-center">
                      {isMobile && (
                        <button 
                          className="mr-2 p-1.5 rounded-full hover:bg-slate-100"
                          onClick={handleBackToList}
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                      )}
                      
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <img
                            src={activeUser.image}
                            alt={activeUser.name}
                            className="w-full h-full object-cover"
                          />
                          {activeUser.isOnline && (
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-medium flex items-center">
                            {activeUser.name}
                            {activeUser.isPremium && (
                              <span className="ml-1 text-amber-500">★</span>
                            )}
                          </h3>
                          <span className="text-xs text-slate-500">
                            {activeUser.isOnline ? 'Online now' : 'Offline'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-grow overflow-y-auto p-4 flex flex-col-reverse">
                      <div className="space-y-4">
                        {mockConversation.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                          >
                            {msg.senderId !== 'me' && (
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                                <img
                                  src={activeUser.image}
                                  alt={activeUser.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            
                            <div
                              className={`max-w-[75%] p-3 rounded-lg ${
                                msg.senderId === 'me'
                                  ? 'bg-date-primary text-white rounded-tr-none'
                                  : 'bg-white border border-slate-200 rounded-tl-none'
                              }`}
                            >
                              <p>{msg.text}</p>
                              <span 
                                className={`text-xs mt-1 block text-right ${
                                  msg.senderId === 'me' ? 'text-white/80' : 'text-slate-500'
                                }`}
                              >
                               asasas
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-3 border-t border-slate-200 bg-white">
                      <form onSubmit={handleSendMessage} className="flex items-center">
                        <button 
                          type="button" 
                          className="p-2 text-slate-500 hover:text-date-primary"
                          onClick={() => toast.info('Upload attachment functionality would be implemented here')}
                        >
                          <Image className="w-5 h-5" />
                        </button>
                        
                        <button 
                          type="button" 
                          className="p-2 text-slate-500 hover:text-date-primary mr-1"
                          onClick={() => toast.info('Emoji picker would be implemented here')}
                        >
                          <Smile className="w-5 h-5" />
                        </button>
                        
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="input-field flex-grow py-2"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                        />
                        
                        <button 
                          type="submit" 
                          className={`p-2 ml-2 rounded-full ${
                            messageText.trim() 
                              ? 'bg-date-primary text-white' 
                              : 'bg-slate-200 text-slate-400'
                          }`}
                          disabled={!messageText.trim()}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                      <MessageItem className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                    <p className="text-slate-500 mb-4 max-w-md">
                      Select a conversation or start a new one by clicking on a user.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Messages;
