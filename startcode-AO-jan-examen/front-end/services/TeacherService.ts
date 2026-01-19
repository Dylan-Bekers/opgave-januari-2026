const getAllTeachers = async () => {
  /*
    Call the back-end API on the route /teachers to get all teachers.
    You will need to implement that route in the back-end.
  */
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL +'/teachers');
  if (!res.ok) throw new Error('Failed to fetch teachers');
  return res.json();
};

const updateLearningPath = async (teacherId: number, learningPath: string) => {
  /*
    Call the back-end API on the route /teachers/:id/learningpath to update the learning path for the teacher.
    You will need to implement that route in the back-end.
  */
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/teachers/${teacherId}/learningpath?learningPath=${encodeURIComponent(learningPath)}`,
    {
      method: 'PUT',
    }
  );
  if (!res.ok) throw new Error('Failed to update learning path');
  return res.json();
};

const TeacherService = {
  getAllTeachers,
  updateLearningPath,
};

export default TeacherService;
