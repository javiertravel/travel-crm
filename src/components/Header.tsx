import { Sun, Moon, Plus, Bell, User } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onAddClient: () => void;
}

export default function Header({ theme, onThemeToggle, onAddClient }: HeaderProps) {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl font-bold">Dashboard</h2>
          <p className="text-gray-400 text-sm">Welcome back to your travel CRM</p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onAddClient}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />
            <span>Add Client</span>
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200">
            <Bell size={20} />
          </button>

          <button
            onClick={onThemeToggle}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <User size={20} className="text-white" />
          </div>
        </div>
      </div>
    </header>
  );
}
