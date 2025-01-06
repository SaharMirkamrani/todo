import React, { useState } from "react";
import TodoCard from "./TodoCard";
import TaskModal from "./TaskModal";

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
  const [filter, setFilter] = useState<"all" | "open" | "closed" | "archived">("all");

  const handleTaskClick = (task: Task) => {
    setTaskData(task);
  };

  const getTaskCount = (filter: "all" | "open" | "closed" | "archived") => {
    switch (filter) {
      case "open":
        return tasks.filter((task) => !task.isComplete).length;
      case "closed":
        return tasks.filter((task) => task.isComplete).length;
      case "archived":
        return 0;
      default:
        return tasks.length;
    }
  };

  const filteredTasks =
    tasks?.filter((task) => {
      switch (filter) {
        case "open":
          return !task.isComplete;
        case "closed":
          return task.isComplete;
        case "archived":
          return false;
        default:
          return true;
      }
    }) || [];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-around pt-0 pb-4 border-b">
        {["all", "open", "closed"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 font-medium text-sm ${
              filter === option ? "text-[#0760FB]" : "text-gray-400"
            }`}
            onClick={() => setFilter(option as "all" | "open" | "closed")}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
            <span
              className="ml-2 text-xs text-white rounded-full px-2 py-0.5"
              style={{ backgroundColor: filter === option ? "#0760FB" : "#E0E0E0" }}
            >
              {getTaskCount(option as "all" | "open" | "closed")}
            </span>
          </button>
        ))}
      </div>

      {filteredTasks.map((task) => (
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
          onDelete={() => console.log("Task deleted")}
        />
      )}
    </div>
  );
};

export default List;
