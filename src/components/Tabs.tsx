import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import React, {useState} from 'react';
import Info from "@/components/Info";
import List from "@/components/List";

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Client review & feedback',
      description: 'Well meaning and kindly. A benevolent smile.',
      date: '2025-01-05',
      isChecked: false,
    },
    {
      id: 2,
      title: 'Project planning',
      description: 'Set up project goals and milestones.',
      date: '2025-01-06',
      isChecked: false,
    },
    {
      id: 3,
      title: 'Team meeting',
      description: 'Discuss project progress and blockers.',
      date: '2025-01-07',
      isChecked: false,
    },
  ]);

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
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '24px 30px 15px',
                width: '50%',
                color: value === '1' ? 'black' : 'inherit',
                borderBottom: value === '1' ? '1px solid black' : 'none',
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
            <Tab
              label="Tomorrow's Task"
              value="2"
              sx={{
                fontSize: '12px',
                width: '50%',
                fontWeight: 'bold',
                textTransform: 'none',
                padding: '24px 30px 15px',
                color: value === '2' ? 'black' : 'inherit',
                borderBottom: value === '2' ? '1px solid black' : 'none',
                '&.Mui-selected': {
                  color: 'black',
                },
              }}
            />
          </TabList>
        </Box>

        <div className="bg-white bg-opacity-80 rounded-b-2xl">
          <TabPanel value="1">
            <Info />
            <List tasks={tasks} />
          </TabPanel>
          <TabPanel value="2">Tomorrow`&apos;`s Task</TabPanel>
        </div>

      </TabContext>
    </Box>
  );
}
