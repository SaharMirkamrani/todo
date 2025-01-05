import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface ReusableButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ text, icon, onClick }) => {
  return (
    <Button
      variant="contained"
      startIcon={icon}
      sx={{
        bgcolor: 'rgba(7, 96, 251, 0.15)',
        color: '#0760FB',
        textTransform: 'none',
        fontWeight: 'bold',
        boxShadow: 'none',
        fontSize: '0.75rem',
        padding: '4px 8px',
        minWidth: 'auto',
        maxWidth: '200px',
        borderRadius: '7px',
        height: '35px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '&:hover': {
          bgcolor: 'rgba(7, 96, 251, 0.4)',
          boxShadow: 'none',
        },
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ReusableButton;
