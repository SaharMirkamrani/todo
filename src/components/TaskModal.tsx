import React, { useEffect } from 'react';
import { Box, Modal, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { Add, Delete } from '@mui/icons-material';
import ReusableButton from '@/components/Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTodo, deleteTodo } from '@/pages/api/todoService';

interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  mode: 'create' | 'update';
  taskData?: {
    id: string;
    title: string;
    description: string;
    date: string;
    endDate: string;
  };
  onDelete: (id: string) => void;
}

interface TaskFormValues {
  title: string;
  description: string;
  date: string;
  endDate: string;
}

const TaskModal: React.FC<TaskModalProps> = ({ open, handleClose, mode, taskData, onDelete }) => {
  const queryClient = useQueryClient();

  const { handleSubmit, control, reset } = useForm<TaskFormValues>({
    defaultValues: {
      title: taskData?.title || '',
      description: taskData?.description || '',
      date: taskData?.date || '',
      endDate: taskData?.endDate || '',
    },
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: () =>
    {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryClient.invalidateQueries(['tasks']);
      handleClose();
    },
  });

  const onSubmit = async (data: TaskFormValues) => {
    try {
      await createMutation.mutateAsync({
        title: data.title,
        description: data.description,
        startDate: data.date,
        endDate: data.endDate,
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      queryClient.invalidateQueries(['tasks']);
      handleClose();
    },
  });

  const handleDelete = async () => {
    if (taskData?.id) {
      try {
        await deleteMutation.mutateAsync(taskData.id);
        onDelete(taskData.id);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };
  

  useEffect(() => {
    if (mode === 'update' && taskData) {
      reset({
        title: taskData.title,
        description: taskData.description,
        date: taskData.date,
        endDate: taskData.endDate,
      });
    } else {
      reset({
        title: '',
        description: '',
        date: '',
        endDate: '',
      });
    }
  }, [open, mode, taskData, reset]);

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
            rules={{ required: 'Start Date is required' }}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="Start Date"
                type="date"
                {...field}
                InputLabelProps={{ shrink: true }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
                sx={{ marginBottom: 2 }}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                fullWidth
                label="End Date"
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
            {mode === 'create' ? (
              <ReusableButton
                text="Create Task"
                icon={<Add />}
                onClick={handleSubmit(onSubmit)}
              />
            ) : (
              <>
                <ReusableButton
                  text="Delete Task"
                  icon={<Delete />}
                  onClick={handleDelete}
                  variant="danger"
                />
              </>
            )}
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default TaskModal;
