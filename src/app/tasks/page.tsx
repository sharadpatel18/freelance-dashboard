import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { getTaskByUserId } from "@/services/tasks/taskServices"
import { getProjectByUserId } from "@/services/projects/projectServices"
import Navbar from "@/components/Navbar"
import TaskList from "@/components/tasks/TaskList"
import CreateTaskModal from "@/components/tasks/CreateTaskModal"
import { Filter, Search, Calendar, CheckCircle, Clock, AlertTriangle } from "lucide-react"

export default async function TasksPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your tasks.</div>
  }

  const tasks = await getTaskByUserId(userId)
  const projects = await getProjectByUserId(userId)

  // Calculate task statistics
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task:any) => task.status === "complete").length
  const overdueTasks = tasks.filter((task:any) => new Date(task.deadline) < new Date() && task.status !== "complete").length
  const todayTasks = tasks.filter((task:any) => {
    const today = new Date()
    const taskDate = new Date(task.deadline)
    return taskDate.toDateString() === today.toDateString() && task.status !== "complete"
  }).length

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
            <p className="text-gray-600 mt-1">Manage and track your project tasks</p>
          </div>
          <CreateTaskModal projects={projects} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Tasks" value={totalTasks} icon={<CheckCircle className="h-5 w-5" />} color="blue" />
          <StatCard title="Completed" value={completedTasks} icon={<CheckCircle className="h-5 w-5" />} color="green" />
          <StatCard title="Due Today" value={todayTasks} icon={<Clock className="h-5 w-5" />} color="amber" />
          <StatCard title="Overdue" value={overdueTasks} icon={<AlertTriangle className="h-5 w-5" />} color="red" />
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Calendar className="h-4 w-4" />
                Date
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <TaskList tasks={tasks} />
      </main>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string
  value: number
  icon: React.ReactNode
  color: "blue" | "green" | "amber" | "red"
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    amber: "bg-amber-50 text-amber-600 border-amber-100",
    red: "bg-red-50 text-red-600 border-red-100",
  }

  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-50">{icon}</div>
      </div>
    </div>
  )
}
