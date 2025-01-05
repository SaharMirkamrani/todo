import React from 'react';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import ReusableButton from '@/components/Button';
import Add from '@mui/icons-material/Add';
import Save from '@mui/icons-material/Save';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  mode: 'create' | 'update';
  initialData?: {
    title: string;
    description: string;
    date: string;
  };
}

interface TaskFormValues {
  title: string;
  description: string;
  date: string;
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  mode,
  initialData,
}) => {
  const { handleSubmit, control, reset } = useForm<TaskFormValues>({
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      date: initialData?.date || '',
    },
  });

  const onSubmit = (data: TaskFormValues) => {
    if (mode === 'create') {
      console.log('Create task:', data);
    } else if (mode === 'update') {
      console.log('Update task:', data);
    }
    handleClose();
    reset();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: '8px',
        }}
      >
        <Typography
          variant="h6"
          component="h2"
          sx={{ marginBottom: 4, fontWeight: 'bold', color: 'black', fontSize: '18px' }}
        >
          {mode === 'create' ? 'Create Task' : 'Update Task'}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Title"
                {...field}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ marginBottom: 2 }}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                label="Description"
                {...field}
                multiline
                rows={3}
                sx={{ marginBottom: 2 }}
              />
            )}
          />

          <Controller
            name="date"
            control={control}
            rules={{ required: 'Date is required' }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Date"
                type="date"
                {...field}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ marginBottom: 2 }}
              />
            )}
          />

          <div className="flex justify-center">
            <ReusableButton
              text={mode === 'create' ? 'Create Task' : 'Update Task'}
              icon={mode === 'create' ? <Add /> : <Save />}
              onClick={() => handleSubmit(onSubmit)()}
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;
