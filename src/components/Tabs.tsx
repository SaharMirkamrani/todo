import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "@/pages/api/todoService";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Info from "@/components/Info";
import List from "@/components/List";
import formatDate from "@/utils/formatTime";
import { ApiTask } from "@/types";
import { isToday, isTomorrow } from "@/utils/dateUtils";

export default function LabTabs() {
  const [value, setValue] = useState("1");

  const { data: tasksData, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
    select: (data) =>
      data.data.map((task: ApiTask) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        date: task.start_date,
        isComplete: task.is_completed,
      })),
  });

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
                fontSize: "13px",
                fontWeight: "bold",
                textTransform: "none",
                padding: "24px 30px 15px",
                width: "50%",
                color: "black",
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
                fontSize: "13px",
                width: "50%",
                fontWeight: "bold",
                textTransform: "none",
                padding: "24px 30px 15px",
                color: "black",
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
            <Info text="today" />
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : isError ? (
              <p className="text-red-500">{error instanceof Error ? error.message : "Error loading tasks"}</p>
            ) : (
              <List
                tasks={tasksData
                  .filter((task) => isToday(task.date))
                  .map((task) => ({
                    ...task,
                    date: formatDate(task.date),
                  }))}
              />
            )}
          </TabPanel>

          <TabPanel value="2">
            <Info text="tomorrow" />
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            ) : isError ? (
              <p className="text-red-500">{error instanceof Error ? error.message : "Error loading tasks"}</p>
            ) : (
              <List
                tasks={tasksData
                  .filter((task) => isTomorrow(task.date))
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
