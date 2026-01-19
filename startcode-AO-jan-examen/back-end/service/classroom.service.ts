import classroomDb from "../repository/classroom.db";
import { Classroom } from "../model/classroom";

const createClassroom = async (name: string): Promise<Classroom> => {
    const trimmed = name?.trim();
    if (!trimmed) throw new Error('Name is required');

    const exists = await classroomDb.getByName(trimmed);
    if (exists) throw new Error('Classroom already exists');

    return classroomDb.createClassroom(trimmed);
};


export default {
    createClassroom,
};