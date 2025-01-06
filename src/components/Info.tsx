import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '@/components/Button';
import TaskModal from '@/components/TaskModal';

const getFormattedDate = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long' };
  return currentDate.toLocaleDateString('en-US', options);
};

const Info: React.FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const formattedDate = getFormattedDate();

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleDelete = () => {
    console.log('Task deleted');
  };

  return (
    <Box className="flex justify-between px-2 pb-6 pt-2">
      <Box className="flex flex-col gap-1">
        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: 16, color: "black" }}>
          Today&apos;s Tasks
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
          {formattedDate}
        </Typography>
      </Box>
      <Button text="Add Task" icon={<AddIcon />} onClick={handleOpen} />
      
      <TaskModal 
        open={openModal} 
        handleClose={handleClose} 
        mode="create" 
        onDelete={handleDelete}
      />
    </Box>
  );
};

export default Info;
