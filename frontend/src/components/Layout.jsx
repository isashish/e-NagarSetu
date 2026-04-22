import Navbar from './Navbar'
import Sidebar from './Sidebar'
import ChatBot from './ChatBot'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
      <ChatBot />
    </div>
  )
}
