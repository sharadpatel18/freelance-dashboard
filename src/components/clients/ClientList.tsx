"use client"

import { useState } from "react"
import { Users, Briefcase, CheckCircle, Calendar, Mail, MoreHorizontal } from "lucide-react"

type Client = {
  name: string
  projects: Array<{
    id: string
    title: string
    createdAt: Date
    tasks: Array<{
      status: string
    }>
  }>
  totalTasks: number
  completedTasks: number
  lastActivity: Date
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

export default function ClientList({ clients }: { clients: Client[] }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "projects" | "activity">("name")

  const filteredClients = clients
    .filter((client) => client.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "projects":
          return b.projects.length - a.projects.length
        case "activity":
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
        default:
          return a.name.localeCompare(b.name)
      }
    })

  if (clients.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No clients yet</h3>
        <p className="text-gray-500 mb-6">Start by creating projects with client names to see them appear here.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="projects">Sort by Projects</option>
              <option value="activity">Sort by Activity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Client Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard key={client.name} client={client} />
        ))}
      </div>
    </div>
  )
}

function ClientCard({ client }: { client: Client }) {
  const completionRate = client.totalTasks > 0 ? Math.round((client.completedTasks / client.totalTasks) * 100) : 0

  const activeProjects = client.projects.filter((project) =>
    project.tasks.some((task) => task.status !== "complete"),
  ).length

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{client.name}</h3>
            <p className="text-sm text-gray-500">
              {client.projects.length} project{client.projects.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
        <button className="p-1 rounded hover:bg-gray-100">
          <MoreHorizontal className="h-4 w-4 text-gray-400" />
        </button>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <Briefcase className="h-4 w-4" />
            Active Projects
          </span>
          <span className="font-medium text-gray-900">{activeProjects}</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            Task Completion
          </span>
          <span className="font-medium text-gray-900">{completionRate}%</span>
        </div>

        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600 flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Last Activity
          </span>
          <span className="font-medium text-gray-900">{formatDistanceToNow(new Date(client.lastActivity))}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Projects</h4>
        <div className="space-y-1">
          {client.projects.slice(0, 2).map((project) => (
            <div key={project.id} className="text-sm text-gray-600 truncate">
              • {project.title}
            </div>
          ))}
          {client.projects.length > 2 && (
            <div className="text-sm text-gray-500">+{client.projects.length - 2} more</div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded">
          <Mail className="h-4 w-4" />
          Contact
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded">
          <Briefcase className="h-4 w-4" />
          Projects
        </button>
      </div>
    </div>
  )
}
