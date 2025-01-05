import React, { useEffect } from 'react';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Add, Save, DeleteForever } from '@mui/icons-material';
import ReusableButton from '@/components/Button';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  mode: 'create' | 'update';
  taskData?: {
    title: string;
    description: string;
    date: string;
  };
  onDelete: () => void;
  onSave: (data: unknown) => void;
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
  taskData,
  onDelete,
  onSave,
}) => {
  const { handleSubmit, control, reset } = useForm<TaskFormValues>({
    defaultValues: {
      title: taskData?.title || '',
      description: taskData?.description || '',
      date: taskData?.date || '',
    },
  });

  useEffect(() => {
    reset({
      title: taskData?.title || '',
      description: taskData?.description || '',
      date: taskData?.date || '',
    });
  }, [taskData, reset]);

  const onSubmit = (data: TaskFormValues) => {
    onSave(data);
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

          <div className="flex justify-between">
            <ReusableButton
              text={mode === 'create' ? 'Create Task' : 'Update Task'}
              icon={mode === 'create' ? <Add /> : <Save />}
              onClick={handleSubmit(onSubmit)}
            />

            {mode === 'update' && (
              <ReusableButton
                text="Delete Task"
                icon={<DeleteForever />}
                onClick={onDelete}
                variant='danger'
              />
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;
