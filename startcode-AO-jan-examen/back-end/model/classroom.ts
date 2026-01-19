import { Classroom as ClassroomPrisma } from '@prisma/client';

export class Classroom {
    readonly id?: number;
    readonly name: string;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(classroom: {
        id?: number;
        name: string;
        createdAt?: Date;
        updatedAt?: Date;
    }) {
        if (!classroom.name.trim()) throw new Error('Name is required');

        this.id = classroom.id;
        this.name = classroom.name;
        this.createdAt = classroom.createdAt;
        this.updatedAt = classroom.updatedAt;
    }

    static from(prismaClassroom: ClassroomPrisma): Classroom {
        return new Classroom({
            id: prismaClassroom.id,
            name: prismaClassroom.name,
            createdAt: prismaClassroom.createdAt,
            updatedAt: prismaClassroom.updatedAt,
        });
    }
}