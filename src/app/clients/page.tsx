import type React from "react"
import { auth } from "@clerk/nextjs/server"
import { getProjectByUserId } from "@/services/projects/projectServices"
import Navbar from "@/components/Navbar"
import ClientList from "@/components/clients/ClientList"
import { Users, Briefcase, DollarSign, Calendar } from "lucide-react"

export default async function ClientsPage() {
  const { userId } = await auth()

  if (!userId) {
    return <div>Please sign in to view your clients.</div>
  }

  const projects = await getProjectByUserId(userId)

  // Process client data from projects
  const clientsMap = new Map()

  projects.forEach((project:any) => {
    if (project.client) {
      const clientName = project.client
      if (!clientsMap.has(clientName)) {
        clientsMap.set(clientName, {
          name: clientName,
          projects: [],
          totalTasks: 0,
          completedTasks: 0,
          lastActivity: project.createdAt,
        })
      }

      const client = clientsMap.get(clientName)
      client.projects.push(project)
      client.totalTasks += project.tasks.length
      client.completedTasks += project.tasks.filter((task:any) => task.status === "complete").length

      // Update last activity if this project is newer
      if (new Date(project.createdAt) > new Date(client.lastActivity)) {
        client.lastActivity = project.createdAt
      }
    }
  })

  const clients = Array.from(clientsMap.values())

  // Calculate statistics
  const totalClients = clients.length
  const activeClients = clients.filter((client) =>
    client.projects.some((project:any) => project.tasks.some((task:any) => task.status !== "complete")),
  ).length
  const totalProjects = clients.reduce((sum, client) => sum + client.projects.length, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
            <p className="text-gray-600 mt-1">Manage your client relationships and project overview</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Clients" value={totalClients} icon={<Users className="h-5 w-5" />} color="blue" />
          <StatCard
            title="Active Clients"
            value={activeClients}
            icon={<Calendar className="h-5 w-5" />}
            color="green"
          />
          <StatCard
            title="Total Projects"
            value={totalProjects}
            icon={<Briefcase className="h-5 w-5" />}
            color="purple"
          />
          <StatCard
            title="Avg Projects/Client"
            value={totalClients > 0 ? Math.round((totalProjects / totalClients) * 10) / 10 : 0}
            icon={<DollarSign className="h-5 w-5" />}
            color="indigo"
          />
        </div>

        {/* Client List */}
        <ClientList clients={clients} />
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
