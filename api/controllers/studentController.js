const Student = require("../models/studentModel");

module.exports.listOfStudents = async (req, res, next) => {
  try {
    const students = await Student.find({});
    res.status(200).send(students);
  } catch (error) {
    next(error);
  }
};

module.exports.createStudent = async (req, res, next) => {
  try {
    console.log("req.body :>> ", req.body);
    const students = new Student(req.body);
    const student = await students.save();
    res.status(200).send(student);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.deleteStudent = async (req, res, next) => {
  try {
    const student = await Student.deleteOne({ _id: req.params.id });
    res.status(200).send(student);
  } catch (error) {
    next(error);
  }
};

module.exports.deleteStudentsWithEmptyNameOrMark = async (req, res, next) => {
  try {
    const result = await Student.deleteMany({
      $or: [
        { name: { $in: [null, "", undefined] } },
        { mark: { $in: [null, undefined] } },
      ],
    });

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

module.exports.updateStudent = async (req, res, next) => {
  try {
    console.log("req.params :>> ", req.params);
    console.log("req.body :>> ", req.body);
    const student = await Student.findOneAndUpdate(req.params, req.body, {
      new: true,
    });
    if (!student) {
      return res.status(404).send("Student not found");
    }
    res.status(200).send(student);
  } catch (error) {
    next(error);
  }
};
