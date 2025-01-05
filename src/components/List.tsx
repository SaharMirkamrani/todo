import React, { useState } from 'react';
import TodoCard from './TodoCard';
import TaskModal from './TaskModal';

interface Task {
  id: number;
  title: string;
  description: string;
  date: string;
  endDate: string;
  isComplete: boolean;
}

interface ListProps {
  tasks: Task[];
}

const List: React.FC<ListProps> = ({ tasks }) => {
  const [taskData, setTaskData] = useState<Task | null>(null);

  const handleTaskClick = (task: Task) => {
    setTaskData(task);
  };

  return (
    <div className='flex flex-col gap-3'>
      {tasks.map((task) => (
        <TodoCard
          key={task.id}
          title={task.title}
          description={task.description}
          date={task.date}
          onTaskClick={() => handleTaskClick(task)}
        />
      ))}

      {taskData && (
        <TaskModal
          open={true}
          handleClose={() => setTaskData(null)}
          taskData={taskData}
          mode="update"
          onSave={(data) => console.log('Saved data:', data)}
          onDelete={() => console.log('Task deleted')}
        />
      )}
    </div>
  );
};

export default List;
