import React, { useState, useEffect, useRef } from 'react'
import { MessageSquare, X, Send, User, Bot, Sparkles, HelpCircle } from 'lucide-react'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! I'm Nagar-Mitra, your digital civic assistant. How can I help you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const scrollRef = useRef(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMsg = { id: Date.now(), text: input, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      let botText = "I'm processing your request. You can ask me about property tax, garbage collection, or how to file a complaint."
      if (input.toLowerCase().includes('tax')) botText = "You can view and pay your property tax in the 'Payments' section. Would you like me to take you there?"
      if (input.toLowerCase().includes('garbage') || input.toLowerCase().includes('waste')) botText = "The next garbage collection for Ward 5 is tomorrow at 7:30 AM. Don't forget to mark your garbage as 'Ready' in the dashboard!"
      if (input.toLowerCase().includes('complaint')) botText = "To file a complaint, click on 'My Complaints' in the sidebar and use the 'File New Complaint' button."

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-primary-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 animate-bounce-slow"
      >
        <MessageSquare size={28} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-8 right-8 w-[380px] h-[520px] bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col z-50 animate-slide-up border border-slate-100 overflow-hidden">
      {/* Header */}
      <div className="bg-navy-900 p-6 text-white relative">
        <div className="absolute top-0 right-0 p-4">
           <button onClick={() => setIsOpen(false)} className="text-white/50 hover:text-white transition-colors">
             <X size={20} />
           </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center shadow-lg border border-white/20">
             <Bot size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-lg leading-tight">Nagar-Mitra</h3>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
               <span className="text-[10px] font-bold text-primary-300 uppercase tracking-widest">AI Assistant Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-body shadow-sm ${
              m.sender === 'user' 
                ? 'bg-primary-600 text-white rounded-tr-none' 
                : 'bg-white text-navy-800 rounded-tl-none border border-slate-100'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className="px-6 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-slate-50/50">
        {['Pay Tax', 'Track Waste', 'File Issue'].map(t => (
          <button 
            key={t} 
            onClick={() => { setInput(t); /* auto-send logic could go here */ }}
            className="whitespace-nowrap px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[10px] font-bold text-slate-500 hover:border-primary-500 hover:text-primary-600 transition-colors shadow-sm"
          >
            {t}
          </button>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100 flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Nagar-Mitra..."
          className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary-500 transition-all font-body"
        />
        <button type="submit" className="w-10 h-10 bg-primary-600 text-white rounded-xl flex items-center justify-center hover:bg-primary-700 transition-colors">
          <Send size={18} />
        </button>
      </form>
    </div>
  )
}
