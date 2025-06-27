"use client"

import type React from "react"

import { Calendar, CheckCircle, Clock, AlertTriangle, TrendingUp, Users } from "lucide-react"

type AnalyticsData = {
  totalTasks: number
  completedTasks: number
  completionRate: number
  totalProjects: number
  activeProjects: number
  monthlyData: Array<{
    month: string
    tasks: number
    projects: number
    completed: number
  }>
  tasks: Array<{
    id: string
    status: string
    deadline: Date
    project: {
      client: string | null
    }
  }>
  projects: Array<{
    client: string | null
    tasks: Array<{
      status: string
    }>
  }>
}

function formatDistanceToNow(date: Date): string {
  const now = new Date()
  const diffInMs = now.getTime() - date.getTime()
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

  if (diffInDays === 0) return "today"
  if (diffInDays === 1) return "1 day ago"
  if (diffInDays > 1) return `${diffInDays} days ago`
  if (diffInDays === -1) return "in 1 day"
  return `in ${Math.abs(diffInDays)} days`
}

export default function AnalyticsDashboard({ data }: { data: AnalyticsData }) {
  // Client distribution
  const clientMap = new Map()
  data.projects.forEach((project) => {
    const client = project.client || "No Client"
    clientMap.set(client, (clientMap.get(client) || 0) + 1)
  })

  const clientData = Array.from(clientMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // Task deadline analysis
  const now = new Date()
  const overdueTasks = data.tasks.filter((task) => new Date(task.deadline) < now && task.status !== "complete").length

  const dueTodayTasks = data.tasks.filter((task) => {
    const taskDate = new Date(task.deadline)
    return taskDate.toDateString() === now.toDateString() && task.status !== "complete"
  }).length

  const upcomingTasks = data.tasks.filter((task) => {
    const taskDate = new Date(task.deadline)
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    return taskDate > now && taskDate <= weekFromNow && task.status !== "complete"
  }).length

  return (
    <div className="space-y-8">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
          <div className="h-64 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>Chart visualization would appear here</p>
              <p className="text-sm">Install recharts for interactive charts</p>
            </div>
          </div>
        </div>

        {/* Task Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Status Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed Tasks</span>
              <span className="font-medium text-green-600">{data.completedTasks}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: `${data.completionRate}%` }} />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Pending Tasks</span>
              <span className="font-medium text-amber-600">{data.totalTasks - data.completedTasks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Clients */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Clients by Projects</h3>
          <div className="space-y-3">
            {clientData.map((client, index) => (
              <div key={client.name} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{client.name}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(client.count / Math.max(...clientData.map((c) => c.count))) * 100}%` }}
                    />
                  </div>
                  <span className="font-medium text-gray-900 w-6 text-right">{client.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Deadlines Overview */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Task Deadlines Overview</h3>
          <div className="space-y-4">
            <DeadlineItem
              icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
              label="Overdue Tasks"
              count={overdueTasks}
              color="red"
            />
            <DeadlineItem
              icon={<Clock className="h-5 w-5 text-amber-500" />}
              label="Due Today"
              count={dueTodayTasks}
              color="amber"
            />
            <DeadlineItem
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              label="Due This Week"
              count={upcomingTasks}
              color="blue"
            />
            <DeadlineItem
              icon={<CheckCircle className="h-5 w-5 text-green-500" />}
              label="Completed"
              count={data.completedTasks}
              color="green"
            />
          </div>
        </div>
      </div>

      {/* Productivity Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Productivity Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InsightCard
            title="Average Tasks per Project"
            value={data.totalProjects > 0 ? Math.round((data.totalTasks / data.totalProjects) * 10) / 10 : 0}
            icon={<TrendingUp className="h-5 w-5 text-blue-500" />}
          />
          <InsightCard
            title="Completion Rate"
            value={`${data.completionRate}%`}
            icon={<CheckCircle className="h-5 w-5 text-green-500" />}
          />
          <InsightCard
            title="Active Clients"
            value={new Set(data.projects.filter((p) => p.client).map((p) => p.client)).size}
            icon={<Users className="h-5 w-5 text-purple-500" />}
          />
        </div>
      </div>
    </div>
  )
}

function DeadlineItem({
  icon,
  label,
  count,
  color,
}: {
  icon: React.ReactNode
  label: string
  count: number
  color: "red" | "amber" | "blue" | "green"
}) {
  const colorClasses = {
    red: "bg-red-50 border-red-100",
    amber: "bg-amber-50 border-amber-100",
    blue: "bg-blue-50 border-blue-100",
    green: "bg-green-50 border-green-100",
  }

  return (
    <div className={`flex items-center justify-between p-4 rounded-lg border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-gray-900">{label}</span>
      </div>
      <span className="text-2xl font-bold text-gray-900">{count}</span>
    </div>
  )
}

function InsightCard({
  title,
  value,
  icon,
}: {
  title: string
  value: string | number
  icon: React.ReactNode
}) {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-600">{title}</div>
    </div>
  )
}
