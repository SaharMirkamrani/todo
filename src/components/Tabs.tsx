import React, { useEffect, useState } from "react";
import Info from "@/components/Info";
import List from "@/components/List";
import { getAllTodos } from "@/pages/api/todoService";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import formatDate from "@/utils/formatTime";

type Task = {
  id: number;
  title: string;
  description: string;
  date: string;
  isComplete: boolean;
};

type ApiTask = {
  _id: string;
  title: string;
  description: string;
  start_date: string;
  is_completed: boolean;
};

export default function LabTabs() {
  const [value, setValue] = useState("1");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getAllTodos();
        const formattedTasks: Task[] = response.data.map((task: ApiTask) => ({
          id: task._id,
          title: task.title,
          description: task.description,
          date: task.start_date,
          isComplete: task.is_completed,
        }));

        setTasks(formattedTasks);
      } catch (err) {
        console.error(err);
        setError("Failed to load tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box className="w-full">
      <TabContext value={value}>
        <Box className="bg-white rounded-t-2xl">
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            className="flex justify-evenly"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            indicatorColor="black"
          >
            <Tab
              label="Today's Task"
              value="1"
              sx={{
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "none",
                padding: "24px 30px 15px",
                width: "50%",
                color: value === "1" ? "black" : "inherit",
                borderBottom: value === "1" ? "1px solid black" : "none",
                "&.Mui-selected": {
                  color: "black",
                },
              }}
            />
            <Tab
              label="Tomorrow's Task"
              value="2"
              sx={{
                fontSize: "12px",
                width: "50%",
                fontWeight: "bold",
                textTransform: "none",
                padding: "24px 30px 15px",
                color: value === "2" ? "black" : "inherit",
                borderBottom: value === "2" ? "1px solid black" : "none",
                "&.Mui-selected": {
                  color: "black",
                },
              }}
            />
          </TabList>
        </Box>

        <div className="bg-white bg-opacity-80 rounded-b-2xl">
          <TabPanel value="1">
            <Info />
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <List
              tasks={tasks
                .filter(
                  (task) =>
                    new Date(task.date).toDateString() ===
                    new Date().toDateString()
                )
                .map((task) => ({
                  ...task,
                  date: formatDate(task.date),
                }))}
            />

            )}
          </TabPanel>
          <TabPanel value="2">
            {loading ? (
              <div className="flex justify-center items-center py-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <List
                tasks={tasks
                  .filter(
                    (task) =>
                      new Date(task.date).toDateString() ===
                      new Date(
                        new Date().setDate(new Date().getDate() + 1)
                      ).toDateString()
                  )
                  .map((task) => ({
                    ...task,
                    date: formatDate(task.date),
                  }))}
              />
            )}
          </TabPanel>
        </div>
      </TabContext>
    </Box>
  );
}
