import React, { useState } from 'react';
import TodoCard from './TodoCard';
import TaskModal from './TaskModal';

interface Task {
  id: string;
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

  console.log(tasks)

  return (
    <div className='flex flex-col gap-3'>
      {tasks.map((task) => (
        <TodoCard
          id={task.id}
          key={task.id}
          title={task.title}
          description={task.description}
          isComplete={task.isComplete}
          date={task.date}
          endDate={task.endDate}
          onTaskClick={() => handleTaskClick(task)}
        />
      ))}

      {taskData && (
        <TaskModal
          open={true}
          handleClose={() => setTaskData(null)}
          taskData={taskData}
          mode="update"
          onDelete={() => console.log('Task deleted')}
        />
      )}
    </div>
  );
};

export default List;
