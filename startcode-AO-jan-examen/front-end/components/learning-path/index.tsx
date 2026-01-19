import TeacherService from '@services/TeacherService';
import { useState, useEffect } from 'react';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const [selectedLearningPath, setSelectedLearningPath] = useState(learningPath);
  
  useEffect(() => {
    setSelectedLearningPath(learningPath);
  }, [learningPath]);


  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    const newLearningPath = event.target.value;

    setSelectedLearningPath(newLearningPath);

    try {
      await TeacherService.updateLearningPath(teacherId, newLearningPath);
    } catch (error) {
      setSelectedLearningPath(learningPath);
      throw error;
    }
  };

  return (
    <div className="ml-6">
      <select 
        id="learningPath" 
        className="ml-2 p-1" 
        value={selectedLearningPath}
        onChange={handleLearningPathChange}
        >
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
