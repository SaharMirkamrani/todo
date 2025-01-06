import { updateTodo } from '@/pages/api/todoService';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react';
import TaskModal from './TaskModal';

interface TodoCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    date: string;
    endDate: string;
    isComplete: boolean;
  };
  onTaskClick: () => void;
}

export default function TodoCard({
  task,
  onTaskClick,
}: TodoCardProps) {
  const { id, title, description, date, endDate, isComplete } = task;

  const [openModal, setOpenModal] = useState(false);
  const [taskData, setTaskData] = useState({
    id: '',
    title: '',
    description: '',
    date: '',
    isComplete,
    endDate: ''
  });
  const [isChecked, setIsChecked] = useState(isComplete);

  const handleCheckboxClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const handleCheckboxChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    try {
      await updateTodo(id, event.target.checked);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleCardClick = () => {
    setTaskData({
      id,
      title,
      description,
      date,
      endDate,
      isComplete
    });
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDelete = () => {
    console.log('Task deleted');
    setOpenModal(false);
  };

  return (
    <>
      <Card
        sx={{ minWidth: 275, borderRadius: '10px', boxShadow: 'none' }}
        onClick={onTaskClick || handleCardClick}
      >
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <Typography
                gutterBottom
                sx={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  textDecoration: isChecked ? 'line-through' : 'none',
                }}
              >
                {title}
              </Typography>
              <Typography variant="body2" color="gray" sx={{ fontSize: 12 }}>
                {description}
              </Typography>
            </div>

            <BpCheckbox
              checked={isChecked}
              onChange={handleCheckboxChange}
              onClick={handleCheckboxClick}
            />
          </div>

          <hr className="mt-3" />
          <Typography
            variant="body2"
            color="gray"
            sx={{ fontSize: 12, marginTop: '10px' }}
          >
            {date}
          </Typography>
        </CardContent>
      </Card>

      <TaskModal
        open={openModal}
        handleClose={handleCloseModal}
        mode="update"
        onDelete={handleDelete}
        taskData={taskData}
      />
    </>
  );
}

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 20,
  height: 20,
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'inset 0 0 0 1px rgba(0, 0, 0, 0.2)',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(25, 118, 210, 0.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.action.hover,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    backgroundColor: theme.palette.action.disabledBackground,
  },
}));

const BpCheckedIcon = styled(BpIcon)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  '&::before': {
    display: 'block',
    width: 20,
    height: 20,
    backgroundImage:
      "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath" +
      " fill='%23fff' d='M9 16.2l-3.5-3.5L4 14l5 5 12-12-1.5-1.5L9 16.2z'/%3E%3C/svg%3E\")",
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

function BpCheckbox(props: CheckboxProps) {
  return (
    <Checkbox
      sx={{ '&:hover': { bgcolor: 'transparent' } }}
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  );
}
