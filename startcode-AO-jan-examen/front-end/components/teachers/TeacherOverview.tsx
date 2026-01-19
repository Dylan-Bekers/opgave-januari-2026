import LearningPath from '@components/learning-path';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);
  const [teacherList, setTeacherList] = useState<Teacher[]>(teachers ?? []);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser') as string));
  }, []);

  useEffect(() => {
    setTeacherList(teachers ?? []);
  }, [teachers]);

  const isAdmin = loggedInUser?.role === 'admin';


  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Learning path</th>
            </tr>
          </thead>
          <tbody>
            {/* Render a row for each teacher containing name and learning path */}
            {/* For question 1.c, you can use the LearningPath component. */}
            {teacherList.map((teacher) => (
              <tr key = {teacher.id}>
                <td>
                  {teacher.user?.firstName} {teacher.user?.lastName}
                </td>
                <td>
                  {!isAdmin && <span>{teacher.learningPath}</span>}

                  {isAdmin && (
                    <LearningPath
                      teacherId={teacher.id}
                      learningPath={teacher.learningPath}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
