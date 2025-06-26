import Navbar from '@/components/Navbar';
import Link from 'next/link';
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Your Freelance Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Manage your tasks, track projects, and analyze your freelance business in one place.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Task Summary Card */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h2 className="text-xl font-semibold text-blue-800 mb-2">Tasks</h2>
              <p className="text-3xl font-bold text-blue-600 mb-2">12</p>
              <p className="text-sm text-blue-500">5 overdue • 3 due today</p>
              <Link href="/tasks" className="text-blue-600 hover:underline mt-2 block">
                View all tasks →
              </Link>
            </div>

            {/* Projects Summary Card */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h2 className="text-xl font-semibold text-green-800 mb-2">Projects</h2>
              <p className="text-3xl font-bold text-green-600 mb-2">7</p>
              <p className="text-sm text-green-500">3 active • 2 pending</p>
              <Link href="/projects" className="text-green-600 hover:underline mt-2 block">
                View all projects →
              </Link>
            </div>

            {/* Earnings Summary Card */}
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
              <h2 className="text-xl font-semibold text-purple-800 mb-2">Earnings</h2>
              <p className="text-3xl font-bold text-purple-600 mb-2">$4,850</p>
              <p className="text-sm text-purple-500">$1,200 pending</p>
              <Link href="/analytics" className="text-purple-600 hover:underline mt-2 block">
                View analytics →
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Tasks</h2>
          <div className="space-y-4">
            {[
              { id: 1, title: 'Complete client proposal', project: 'Marketing Website', due: 'Today', priority: 'high' },
              { id: 2, title: 'Review design mockups', project: 'E-commerce App', due: 'Tomorrow', priority: 'medium' },
              { id: 3, title: 'Send invoice to client', project: 'Logo Design', due: 'Jun 15', priority: 'low' },
            ].map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50">
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.project} • Due {task.due}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {task.priority} priority
                </span>
              </div>
            ))}
            <Link href="/tasks" className="text-blue-600 hover:underline mt-2 block text-center">
              View all tasks
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}