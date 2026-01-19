import teacherDb from '../repository/teacher.db';
import { Teacher } from '../model/teacher';

const getAllTeachers = async (): Promise<Teacher[]> => teacherDb.getAllTeachers();

const updateLearningPath = async (teacherId: number, learningPath: string): Promise<Teacher> => {
    if (!Number.isInteger(teacherId)) throw new Error('Invalid teacher ID.');
    if (!learningPath || learningPath.trim().length === 0) throw new Error('Learning path cannot be empty.');
    return teacherDb.updateLearningPath(teacherId, learningPath.trim());
};

export default { getAllTeachers, updateLearningPath };
