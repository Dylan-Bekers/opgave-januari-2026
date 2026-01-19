/**
 * @swagger
 *   components:
 *    schemas:
 *      Classroom:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          name:
 *            type: string
 *            description: Classroom name.
 *      ClassroomInput:
 *        type: object
 *        required:
 *          - name
 *        properties:
 *          name:
 *            type: string
 */

import express, { NextFunction, Request, Response } from 'express';
import classroomService from '../service/classroom.service';
import { ClassroomInput } from '../types';

const classroomRouter = express.Router();

/**
 * @swagger
 * /classrooms:
 *   post:
 *     summary: Create a classroom
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClassroomInput'
 *     responses:
 *       201:
 *         description: The created classroom
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Classroom'
 *       409:
 *         description: Classroom already exists
 */

classroomRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as ClassroomInput;
        const created = await classroomService.createClassroom(body.name);
        res.status(201).json(created);
    } catch (error) {
        if (error?.message === 'Classroom already exists') {
            res.status(409).json({ message: error.message });
        }
        if (error?.message === 'Name is required') {
            res.status(400).json({ message: error.message });
        }
        next(error);
    }
});

export { classroomRouter };