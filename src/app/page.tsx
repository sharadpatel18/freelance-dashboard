import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { 
  CheckCircle, Clock, AlertCircle, ArrowRight, TrendingUp, 
  Calendar, FileText, PieChart, MessageSquare, Bell 
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-6 space-y-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
              <p className="text-blue-100 max-w-2xl">
                You have <span className="font-semibold text-white">3 priority tasks</span> to complete today. 
                Your weekly productivity is up <span className="font-semibold text-white">12%</span> from last week!
              </p>
            </div>
            <button className="p-2 rounded-full bg-white bg-opacity-10 hover:bg-opacity-20 transition">
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Tasks" 
            value={12} 
            change="+2 from yesterday"
            icon={<CheckCircle className="h-5 w-5" />}
            href="/tasks"
            color="blue"
          >
            <div className="flex gap-2 text-sm mt-1">
              <span className="text-red-500 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" /> 5 overdue
              </span>
              <span className="text-amber-500 flex items-center">
                <Clock className="h-4 w-4 mr-1" /> 3 due today
              </span>
            </div>
          </StatCard>

          <StatCard 
            title="Projects" 
            value={7} 
            change="1 new this week"
            icon={<FileText className="h-5 w-5" />}
            href="/projects"
            color="green"
          >
            <div className="flex gap-2 text-sm mt-1">
              <span className="text-green-600">3 active</span>
              <span className="text-gray-500">2 pending</span>
            </div>
          </StatCard>

          <StatCard 
            title="Earnings" 
            value="$4,850" 
            change="12% from last month"
            icon={<TrendingUp className="h-5 w-5" />}
            href="/analytics"
            color="purple"
          >
            <div className="text-sm text-purple-600 mt-1">
              $1,200 pending
            </div>
          </StatCard>

          <StatCard 
            title="Upcoming" 
            value="2 meetings" 
            change="Next: Today 3PM"
            icon={<Calendar className="h-5 w-5" />}
            href="/calendar"
            color="indigo"
          >
            <div className="text-sm text-indigo-600 mt-1">
              1 client call tomorrow
            </div>
          </StatCard>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Tasks (Wider Column) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Tasks Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Recent Tasks</h2>
                <Link href="/tasks" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { id: 1, title: 'Complete client proposal', project: 'Marketing Website', due: 'Today', priority: 'high' },
                  { id: 2, title: 'Review design mockups', project: 'E-commerce App', due: 'Tomorrow', priority: 'medium' },
                  { id: 3, title: 'Send invoice to client', project: 'Logo Design', due: 'Jun 15', priority: 'low' },
                  { id: 4, title: 'Prepare project roadmap', project: 'SAAS Platform', due: 'Jun 18', priority: 'medium' },
                  { id: 5, title: 'Client feedback session', project: 'Mobile App', due: 'Jun 20', priority: 'high' },
                ].map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Active Projects */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">Active Projects</h2>
                <Link href="/projects" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="divide-y divide-gray-200">
                {[
                  { id: 1, name: 'E-commerce Website', client: 'Fashion Co.', progress: 75, deadline: 'Jul 15', budget: '$5,000' },
                  { id: 2, name: 'Mobile App UI', client: 'Tech Startup', progress: 30, deadline: 'Aug 1', budget: '$3,500' },
                  { id: 3, name: 'Brand Identity', client: 'Consulting Firm', progress: 90, deadline: 'Jun 25', budget: '$2,800' },
                ].map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar (Narrower Column) */}
          <div className="space-y-6">
            {/* Upcoming Calendar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Upcoming</h2>
                <Link href="/calendar" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, title: 'Client Meeting', time: 'Today, 3:00 PM', type: 'meeting' },
                  { id: 2, title: 'Project Deadline', time: 'Tomorrow, 11:59 PM', type: 'deadline' },
                  { id: 3, title: 'Payment Due', time: 'Jun 20', type: 'payment' },
                ].map((event) => (
                  <EventItem key={event.id} event={event} />
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Messages</h2>
                <Link href="/messages" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
                  View all <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
              <div className="space-y-4">
                {[
                  { id: 1, sender: 'Alex Johnson', message: 'About the project requirements...', time: '2h ago', unread: true },
                  { id: 2, sender: 'Marketing Team', message: 'Feedback on the latest designs', time: '1d ago', unread: false },
                  { id: 3, sender: 'Sarah Wilson', message: 'Contract signed and sent!', time: '2d ago', unread: false },
                ].map((message) => (
                  <MessageItem key={message.id} message={message} />
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Weekly Stats</h2>
              <div className="space-y-3">
                <StatItem label="Hours Worked" value="32" change="+4 from last week" />
                <StatItem label="Tasks Completed" value="18" change="+3 from last week" />
                <StatItem label="Earnings" value="$1,240" change="+12% from last week" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Reusable Components (put these in separate files later)

function StatCard({ title, value, change, icon, href, color, children }: {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  href: string;
  color: 'blue' | 'green' | 'purple' | 'indigo';
  children?: React.ReactNode;
}) {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800', hover: 'hover:bg-blue-100' },
    green: { bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-800', hover: 'hover:bg-green-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-100', text: 'text-purple-800', hover: 'hover:bg-purple-100' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-800', hover: 'hover:bg-indigo-100' },
  };

  return (
    <div className={`rounded-xl border ${colorClasses[color].border} ${colorClasses[color].bg} p-5 ${colorClasses[color].hover} transition-colors`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold mt-1 ${colorClasses[color].text}">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
          {children}
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color].bg} bg-opacity-50`}>
          {icon}
        </div>
      </div>
      <Link href={href} className={`mt-4 text-sm font-medium ${colorClasses[color].text} flex items-center`}>
        View details <ArrowRight className="h-4 w-4 ml-1" />
      </Link>
    </div>
  );
}

function TaskItem({ task }: { task: { id: number; title: string; project: string; due: string; priority: string } }) {
  const priorityClasses = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-amber-100 text-amber-800',
    low: 'bg-green-100 text-green-800',
  };

  return (
    <Link href={`/tasks/${task.id}`} className="block hover:bg-gray-50 transition-colors">
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{task.project}</p>
        </div>
        <div className="flex items-center gap-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${priorityClasses[task.priority as keyof typeof priorityClasses]}`}>
            {task.priority} priority
          </span>
          <span className="text-sm text-gray-500 whitespace-nowrap">Due {task.due}</span>
        </div>
      </div>
    </Link>
  );
}

function ProjectItem({ project }: { project: { id: number; name: string; client: string; progress: number; deadline: string; budget: string } }) {
  return (
    <Link href={`/projects/${project.id}`} className="block hover:bg-gray-50 transition-colors">
      <div className="px-6 py-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-gray-900">{project.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{project.client}</p>
          </div>
          <span className="text-sm font-medium text-gray-900">{project.budget}</span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{project.progress}% complete</span>
            <span>Due {project.deadline}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function EventItem({ event }: { event: { id: number; title: string; time: string; type: string } }) {
  const typeClasses = {
    meeting: 'bg-blue-100 text-blue-800',
    deadline: 'bg-purple-100 text-purple-800',
    payment: 'bg-green-100 text-green-800',
  };

  return (
    <div className="flex items-start gap-3">
      <div className={`flex-shrink-0 p-2 rounded-lg ${typeClasses[event.type as keyof typeof typeClasses]}`}>
        <Calendar className="h-4 w-4" />
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{event.title}</h3>
        <p className="text-sm text-gray-500">{event.time}</p>
      </div>
    </div>
  );
}

function MessageItem({ message }: { message: { id: number; sender: string; message: string; time: string; unread: boolean } }) {
  return (
    <Link href={`/messages/${message.id}`} className="block hover:bg-gray-50 transition-colors -mx-2 p-2 rounded">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 p-2 rounded-full bg-gray-100">
          <MessageSquare className="h-4 w-4 text-gray-500" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-baseline">
            <h3 className={`text-sm truncate ${message.unread ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
              {message.sender}
            </h3>
            <span className="text-xs text-gray-500">{message.time}</span>
          </div>
          <p className={`text-sm truncate ${message.unread ? 'text-gray-900' : 'text-gray-500'}`}>
            {message.message}
          </p>
        </div>
      </div>
    </Link>
  );
}

function StatItem({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <div className="text-right">
        <p className="font-medium text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{change}</p>
      </div>
    </div>
  );
}