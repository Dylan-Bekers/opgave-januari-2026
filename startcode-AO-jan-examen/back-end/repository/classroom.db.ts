import database from "../util/database";
import { Classroom } from "../model/classroom";

const getByName = async (name: string): Promise<Classroom | null> => {
    // used to check if classroom already exists (vraag g)
    const found = await database.classroom.findFirst({ where: { name } });
    return found ? Classroom.from(found) : null;
};

const createClassroom = async (name: string): Promise<Classroom> => {
    // insert new classroom and return with ID (vraag e)
    const created = await database.classroom.create({ data: {name} });
    return Classroom.from(created);
};

export default {
    getByName,
    createClassroom,
};