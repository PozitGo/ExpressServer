const express = require("express");
const router = express.Router();
const {
  listOfStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  deleteStudentsWithEmptyNameOrMark,
} = require("../controllers/studentController");

router.route("/student").get(listOfStudents).post(createStudent);
/**
 * @swagger
 * /student:
 *   get:
 *     tags: [Students]
 *     summary: Retrieve a list of students
 *     description: Retrieve a list of students. This endpoint can filter students based on the initial letter of their name.
 *     parameters:
 *       - in: query
 *         name: letter
 *         required: false
 *         description: Initial letter of the student's name for filtering.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of students.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: Unique identifier for the student.
 *                   name:
 *                     type: string
 *                     description: Name of the student.
 *                   group:
 *                     type: string
 *                     description: Group or class of the student.
 *                   photo:
 *                     type: string
 *                     description: URL of the student's photograph.
 *                   mark:
 *                     type: integer
 *                     description: Academic mark of the student.
 *                   isDonePr:
 *                     type: boolean
 *                     description: Indicates whether the student has completed their project.
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp of when the student was added.
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Timestamp of the latest update for the student's record.
 *                   __v:
 *                     type: integer
 *                     description: Version number of the student record.
 *
 *       400:
 *         description: Bad request.
 *       404:
 *         description: No students found.
 *       500:
 *         description: Internal server error.
 *
 *   post:
 *     tags: [Students]
 *     summary: Add a new student
 *     description: Adds a new student to the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the student.
 *               group:
 *                 type: string
 *                 description: Group or class of the student.
 *               photo:
 *                 type: string
 *                 description: URL of the student's photograph.
 *               mark:
 *                 type: integer
 *                 description: Academic mark of the student.
 *               isDonePr:
 *                 type: boolean
 *                 description: Indicates whether the student has completed their project.
 *
 *     responses:
 *       200:
 *         description: Student added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier for the student.
 *                 name:
 *                   type: string
 *                   description: Name of the student.
 *                 group:
 *                   type: string
 *                   description: Group or class of the student.
 *                 photo:
 *                   type: string
 *                   description: URL of the student's photograph.
 *                 mark:
 *                   type: integer
 *                   description: Academic mark of the student.
 *                 isDonePr:
 *                   type: boolean
 *                   description: Indicates whether the student has completed their project.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of when the student was added.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of the latest update for the student's record.
 *                 __v:
 *                   type: integer
 *                   description: Version number of the student record.
 *
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */

router.route("/student/:_id").patch(updateStudent);
/**
 * @swagger
 * /student/{id}:
 *   patch:
 *     tags: [Students]
 *     summary: Update a student's data
 *     description: Updates the data of a specific student identified by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the student.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the student.
 *               group:
 *                 type: string
 *                 description: Updated group or class of the student.
 *               photo:
 *                 type: string
 *                 description: Updated URL of the student's photograph.
 *               mark:
 *                 type: integer
 *                 description: Updated academic mark of the student.
 *               isDonePr:
 *                 type: boolean
 *                 description: Updated status indicating whether the student has completed their project.
 *     responses:
 *       200:
 *         description: Student data updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: Unique identifier of the student.
 *                 name:
 *                   type: string
 *                   description: Name of the student.
 *                 group:
 *                   type: string
 *                   description: Group or class of the student.
 *                 photo:
 *                   type: string
 *                   description: URL of the student's photograph.
 *                 mark:
 *                   type: integer
 *                   description: Academic mark of the student.
 *                 isDonePr:
 *                   type: boolean
 *                   description: Indicates whether the student has completed their project.
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Timestamp of the latest update for the student's record.
 *
 *       400:
 *         description: Bad request.
 *       404:
 *         description: No student found with the provided ID.
 *       500:
 *         description: Internal server error.
 */

router.route("/student").delete(deleteStudentsWithEmptyNameOrMark);
/**
 * @swagger
 * /student:
 *   delete:
 *     tags: [Students]
 *     summary: Delete students with empty names or marks
 *     description: Deletes all students who have either an empty name or no mark specified.
 *     responses:
 *       200:
 *         description: Deletion result.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deletedCount:
 *                   type: integer
 *                   description: The number of students deleted.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Internal server error.
 */
router.route("/student/:id").delete(deleteStudent);
/**
 * @swagger
 * /student/{id}:
 *   delete:
 *     tags: [Students]
 *     summary: Delete a student
 *     description: Deletes a student from the system using their unique ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique identifier of the student to be deleted.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Confirmation of deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 acknowledged:
 *                   type: boolean
 *                   description: Indicates if the deletion request was received.
 *                 deletedCount:
 *                   type: integer
 *                   description: Number of student records deleted.
 *
 *       400:
 *         description: Bad request. Invalid student ID or request format.
 *       404:
 *         description: No student found with the provided ID.
 *       500:
 *         description: Internal server error.
 */

module.exports = router;
