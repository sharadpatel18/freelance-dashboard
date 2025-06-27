"use client"

import { useState } from "react"
import { Calendar, Clock, CheckCircle, Circle, AlertTriangle, MoreHorizontal } from "lucide-react"

type Task = {
  id: string
  title: string
  status: string
  deadline: Date
  createdAt: Date
  project: {
    id: string
    title: string
    client: string | null
  }
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

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const [filter, setFilter] = useState<"all" | "pending" | "complete" | "overdue">("all")

  const filteredTasks = tasks.filter((task) => {
    const isOverdue = new Date(task.deadline) < new Date() && task.status !== "complete"

    switch (filter) {
      case "pending":
        return task.status !== "complete" && !isOverdue
      case "complete":
        return task.status === "complete"
      case "overdue":
        return isOverdue
      default:
        return true
    }
  })

  const toggleTaskStatus = async (taskId: string, currentStatus: string) => {
    console.log("Toggle task status:", taskId, currentStatus)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6 py-4">
          {[
            { key: "all", label: "All Tasks", count: tasks.length },
            {
              key: "pending",
              label: "Pending",
              count: tasks.filter((t) => t.status !== "complete" && new Date(t.deadline) >= new Date()).length,
            },
            {
              key: "overdue",
              label: "Overdue",
              count: tasks.filter((t) => new Date(t.deadline) < new Date() && t.status !== "complete").length,
            },
            { key: "complete", label: "Completed", count: tasks.filter((t) => t.status === "complete").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key as any)}
              className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                filter === tab.key
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  filter === tab.key ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Task List */}
      <div className="divide-y divide-gray-200">
        {filteredTasks.length === 0 ? (
          <div className="p-8 text-center">
            <Circle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {filter === "all" ? "Create your first task to get started." : `No ${filter} tasks at the moment.`}
            </p>
          </div>
        ) : (
          filteredTasks.map((task) => <TaskItem key={task.id} task={task} onToggleStatus={toggleTaskStatus} />)
        )}
      </div>
    </div>
  )
}

function TaskItem({
  task,
  onToggleStatus,
}: {
  task: Task
  onToggleStatus: (taskId: string, currentStatus: string) => void
}) {
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== "complete"
  const isCompleted = task.status === "complete"
  const isDueToday = new Date(task.deadline).toDateString() === new Date().toDateString()

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        {/* Status Checkbox */}
        <button onClick={() => onToggleStatus(task.id, task.status)} className="mt-1 flex-shrink-0">
          {isCompleted ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <Circle className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          )}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className={`font-medium ${isCompleted ? "text-gray-500 line-through" : "text-gray-900"}`}>
                {task.title}
              </h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {task.project.title}
                </span>
                {task.project.client && <span>• {task.project.client}</span>}
              </div>
            </div>

            {/* Actions */}
            <button className="p-1 rounded hover:bg-gray-100">
              <MoreHorizontal className="h-4 w-4 text-gray-400" />
            </button>
          </div>

          {/* Deadline and Status */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-4">
              <div
                className={`flex items-center gap-1 text-sm ${
                  isOverdue ? "text-red-600" : isDueToday ? "text-amber-600" : "text-gray-500"
                }`}
              >
                <Clock className="h-4 w-4" />
                {isOverdue ? (
                  <>
                    <AlertTriangle className="h-4 w-4" />
                    Overdue by {formatDistanceToNow(new Date(task.deadline))}
                  </>
                ) : isDueToday ? (
                  "Due today"
                ) : (
                  `Due ${formatDistanceToNow(new Date(task.deadline))}`
                )}
              </div>
            </div>

            {/* Priority/Status Badge */}
            <div className="flex items-center gap-2">
              {isOverdue && !isCompleted && (
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Overdue</span>
              )}
              {isDueToday && !isCompleted && (
                <span className="px-2 py-1 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                  Due Today
                </span>
              )}
              {isCompleted && (
                <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  Completed
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
