import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { getTaskByUserId } from "@/services/tasks/taskServices"
import { getProjectByUserId } from "@/services/projects/projectServices"
import Navbar from "@/components/Navbar"
import AnalyticsDashboard from "@/components/analytics/AnalYticsDashboard"
import { BarChart3, TrendingUp, Calendar, CheckCircle } from "lucide-react"

export default async function AnalyticsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your analytics.</div>
  }

  const tasks = await getTaskByUserId(userId)
  const projects = await getProjectByUserId(userId)

  // Calculate analytics data
  const totalTasks = tasks.length
  const completedTasks = tasks.filter((task:any) => task.status === "complete").length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const totalProjects = projects.length
  const activeProjects = projects.filter((project:any) => project.tasks.some((task:any) => task.status !== "complete")).length

  // Calculate monthly data for charts
  const now = new Date()
  const monthlyData = []

  for (let i = 5; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0)

    const monthTasks = tasks.filter((task:any) => {
      const taskDate = new Date(task.createdAt)
      return taskDate >= month && taskDate <= monthEnd
    })

    const monthProjects = projects.filter((project:any) => {
      const projectDate = new Date(project.createdAt)
      return projectDate >= month && projectDate <= monthEnd
    })

    monthlyData.push({
      month: month.toLocaleDateString("en-US", { month: "short" }),
      tasks: monthTasks.length,
      projects: monthProjects.length,
      completed: monthTasks.filter((task:any) => task.status === "complete").length,
    })
  }

  const analyticsData = {
    totalTasks,
    completedTasks,
    completionRate,
    totalProjects,
    activeProjects,
    monthlyData,
    tasks,
    projects,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-600 mt-1">Track your productivity and project insights</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Task Completion Rate"
            value={`${completionRate}%`}
            change="+5% from last month"
            icon={<CheckCircle className="h-5 w-5" />}
            color="green"
          />
          <MetricCard
            title="Active Projects"
            value={activeProjects}
            change={`${totalProjects - activeProjects} completed`}
            icon={<BarChart3 className="h-5 w-5" />}
            color="blue"
          />
          <MetricCard
            title="Total Tasks"
            value={totalTasks}
            change={`${completedTasks} completed`}
            icon={<TrendingUp className="h-5 w-5" />}
            color="purple"
          />
          <MetricCard
            title="This Month"
            value={monthlyData[monthlyData.length - 1]?.tasks || 0}
            change="tasks created"
            icon={<Calendar className="h-5 w-5" />}
            color="indigo"
          />
        </div>

        {/* Analytics Dashboard */}
        <AnalyticsDashboard data={analyticsData} />
      </main>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string
  value: string | number
  change: string
  icon: React.ReactNode
  color: "green" | "blue" | "purple" | "indigo"
}) {
  const colorClasses = {
    green: "bg-green-50 text-green-600 border-green-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  }

  return (
    <div className={`rounded-lg border p-6 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          <p className="text-xs text-gray-500 mt-1">{change}</p>
        </div>
        <div className="p-2 rounded-lg bg-white bg-opacity-50">{icon}</div>
      </div>
    </div>
  )
}
