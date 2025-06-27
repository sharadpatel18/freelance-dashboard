"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Users, CheckCircle, MoreHorizontal, Briefcase } from "lucide-react"

type Project = {
  id: string
  title: string
  client: string | null
  createdAt: Date
  tasks: Array<{
    id: string
    title: string
    status: string
    deadline: Date
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

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const [view, setView] = useState<"grid" | "list">("grid")

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <Briefcase className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
        <p className="text-gray-500 mb-6">Create your first project to get started with managing your work.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {projects.length} project{projects.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="flex rounded-lg border border-gray-300 p-1">
          <button
            onClick={() => setView("grid")}
            className={`px-3 py-1 text-sm rounded ${
              view === "grid" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1 text-sm rounded ${
              view === "list" ? "bg-blue-100 text-blue-700" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Projects */}
      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
          {projects.map((project) => (
            <ProjectListItem key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const completedTasks = project.tasks.filter((task) => task.status === "complete").length
  const totalTasks = project.tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{project.title}</h3>
            {project.client && (
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Users className="h-4 w-4" />
                {project.client}
              </p>
            )}
          </div>
          <button className="p-1 rounded hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <CheckCircle className="h-4 w-4" />
            {completedTasks}/{totalTasks} tasks
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDistanceToNow(new Date(project.createdAt))}
          </span>
        </div>
      </div>
    </Link>
  )
}

function ProjectListItem({ project }: { project: Project }) {
  const completedTasks = project.tasks.filter((task) => task.status === "complete").length
  const totalTasks = project.tasks.length
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Link href={`/projects/${project.id}`}>
      <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{project.title}</h3>
                {project.client && (
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {project.client}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {completedTasks}/{totalTasks} tasks
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(project.createdAt))}
                </span>
                <div className="w-24">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <span className="w-12 text-right">{Math.round(progress)}%</span>
              </div>
            </div>
          </div>

          <button className="p-1 rounded hover:bg-gray-100 ml-4">
            <MoreHorizontal className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>
    </Link>
  )
}
