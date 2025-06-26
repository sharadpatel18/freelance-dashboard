import { prisma } from "@/lib/prisma"

type IProject = {
  title: string
  client?: string
  userId: string
}

export const createProjects = async (project: IProject) => {
  try {
    const newProject = await prisma.project.create({
      data: {
        title: project.title,
        client: project.client,
        userId: project.userId,
      },
    })

    return newProject
  } catch (error) {
    console.error("Error creating project:", error)
    throw new Error("project is not create something wrong.")
  }
}


export const getAllProject = async () => {
    try {
        const projects = await prisma.project.findMany({});
        return projects;
    } catch (error) {
        console.log("Error getting all projects:",error);
        throw new Error("something wrong when try to get all projects.")
    }
}

export const getProjectById = async (projectId:string) => {
    try {
        const projects = await prisma.project.findFirst({
            where:{
                id: projectId
            },
            include:{
                user: true,
                tasks: true,
            }
        })

        return projects

    } catch (error) {
        console.log("Error getting projects using id:",error);
        throw new Error("something wrong when try to get projects using id.")    
    }
}

export const getProjectByUserId = async (userId :string) => {
    try {
        const projects = await prisma.project.findMany({
            where:{
                userId:userId
            },
            include:{
                user:true,
                tasks:true
            }
        })

        return projects

    } catch (error) {
        console.log("Error getting projects using userid:",error);
        throw new Error("something wrong when try to get projects using userid.")    
    }
}

export const deleteProjectById = async (projectId:string) => {
    try {
        const project = await prisma.project.delete({
            where: {
                id: projectId
            }
        })
        return project
    } catch (error) {
        console.log("Error deleting project using id:",error);
        throw new Error("something wrong when try to delete project using id.")    
    }
}

export const updateProjectById = async (projectId:string, project: IProject) => {
    try {
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId
            },
            data: {
                title: project.title,
                client: project.client
            }
        })
        return updatedProject
    } catch (error) {
        console.log("Error updating project using id:",error);
        throw new Error("something wrong when try to update project using id.")    
    }
}