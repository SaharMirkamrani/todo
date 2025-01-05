import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import TodoCard from "@/components/TodoCard"
import Info from "@/components/Info";

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

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
            <TodoCard />
          </TabPanel>
          <TabPanel value="2">Tomorrow`&apos;`s Task</TabPanel>
        </div>

      </TabContext>
    </Box>
  );
}
