import AddIcon from '@mui/icons-material/Add';
import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import Button from '@/components/Button';
import TaskModal from '@/components/TaskModal';

const getFormattedDate = (isTomorrow: boolean) => {
  const currentDate = new Date();
  if (isTomorrow) {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long' };
  return currentDate.toLocaleDateString('en-US', options);
};

interface InfoProps {
  text: 'today' | 'tomorrow';
}

const Info: React.FC<InfoProps> = ({ text }) => {
  const [openModal, setOpenModal] = useState(false);
  
  const formattedDate = getFormattedDate(text === 'tomorrow');

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleDelete = () => {
    console.log('Task deleted');
  };

  return (
    <Box className="flex justify-between px-2 pb-6 pt-2">
      <Box className="flex flex-col gap-1">
        <Typography variant="body2" fontWeight="bold" sx={{ fontSize: 16, color: "black" }}>
          {text === 'today' ? "Today's Tasks" : "Tomorrow's Tasks"}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12 }}>
          {formattedDate}
        </Typography>
      </Box>
      <Button text="New Task" icon={<AddIcon />} onClick={handleOpen} />
      
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
