import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { getProjectByUserId } from "@/services/projects/projectServices"
import Navbar from "@/components/Navbar"
import ProjectGrid from "@/components/projects/ProjectGrid"
import CreateProjectModal from "@/components/projects/CreateprojectModal"
import { Briefcase, Users, Calendar } from "lucide-react"

export default async function ProjectsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your projects.</div>
  }

  const projects = await getProjectByUserId(userId)

  // Calculate project statistics
  const totalProjects = projects.length
  const activeProjects = projects.filter((project:any) => project.tasks.some((task:any) => task.status !== "complete")).length
  const completedProjects = projects.filter(
    (project:any) => project.tasks.length > 0 && project.tasks.every((task:any) => task.status === "complete"),
  ).length
  const uniqueClients = new Set(projects.map((p:any) => p.client).filter(Boolean)).size

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <p className="text-gray-600 mt-1">Manage your client projects and track progress</p>
          </div>
          <CreateProjectModal />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Projects"
            value={totalProjects}
            icon={<Briefcase className="h-5 w-5" />}
            color="blue"
          />
          <StatCard
            title="Active Projects"
            value={activeProjects}
            icon={<Calendar className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            title="Completed"
            value={completedProjects}
            icon={<Calendar className="h-5 w-5" />}
            color="purple"
          />
          <StatCard title="Clients" value={uniqueClients} icon={<Users className="h-5 w-5" />} color="indigo" />
        </div>

        {/* Projects Grid */}
        <ProjectGrid projects={projects} />
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
  color: "blue" | "green" | "purple" | "indigo"
}) {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    green: "bg-green-50 text-green-600 border-green-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
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
