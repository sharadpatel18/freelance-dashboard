import { prisma } from "@/lib/prisma"

type ITask = {
    title: string
    deadline: Date
    projectId: string
}

export const createTask = async (task: ITask) => {
    try {
        const newTask = await prisma.task.create({
            data: {
                title: task.title,
                projectId: task.projectId,
                deadline: task.deadline
            }
        })
        return newTask
    } catch (error) {
        console.error("Error creating task:", error)
        throw new Error("task is not create something wrong.")
    }
}

export const getAllTask = async () => {
    try {
        const tasks = await prisma.task.findMany({})
        return tasks
    } catch (error) {
        console.log("Error getting all tasks:", error)
        throw new Error("something wrong when try to get all tasks.")
    }
}

export const getTaskById = async (taskId: string) => {
    try {
        const task = await prisma.task.findFirst({
            where: {
                id: taskId
            }
        })
        return task
    } catch (error) {
        console.log("Error getting task using id:", error)
        throw new Error("something wrong when try to get task using id.")
    }
}

export const getTaskByProjectId = async (projectId: string) => {
    try {
        const task = await prisma.task.findMany({
            where: {
                projectId: projectId
            }
        })
        return task
    } catch (error) {
        console.log("Error getting task using project id:", error)
        throw new Error("something wrong when try to get task using project id.")
    }
}

export const getTaskByUserId = async (userId: string) => {
    try {
        const task = await prisma.task.findMany({
            where: {
                project: {
                    userId: userId
                }
            },
            include:{
                project: true
            }
        })
        return task
    } catch (error) {
        console.log("Error getting task using user id:", error)
        throw new Error("something wrong when try to get task using user id.")
    }
}

export const deleteTaskById = async (taskId: string) => {
    try {
        const task = await prisma.task.delete({
            where: {
                id: taskId
            }
        })
        return task
    } catch (error) {
        console.log("Error deleting task using id:", error)
        throw new Error("something wrong when try to delete task using id.")
    }
}

export const updateTaskById = async (taskId: string, task: ITask) => {
    try {
        const updatedTask = await prisma.task.update({
            where: {
                id: taskId
            },
            data: {
                title: task.title,
                deadline: task.deadline
            }
        })
        return updatedTask
    } catch (error) {
        console.log("Error updating task using id:", error)
        throw new Error("something wrong when try to update task using id.")
    }
}

