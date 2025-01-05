import React, { ReactNode } from 'react';
import { Button } from '@mui/material';

interface ReusableButtonProps {
  text: string;
  icon: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'danger';
}

const ReusableButton: React.FC<ReusableButtonProps> = ({ text, icon, onClick, variant = 'primary' }) => {
  const buttonStyles = {
    primary: {
      bgcolor: 'rgba(7, 96, 251, 0.15)',
      color: '#0760FB',
      '&:hover': {
        bgcolor: 'rgba(7, 96, 251, 0.4)',
        boxShadow: 'none',
      },
    },
    danger: {
      bgcolor: 'rgba(255, 0, 0, 0.15)',
      color: '#D32F2F',
      '&:hover': {
        bgcolor: 'rgba(255, 0, 0, 0.4)',
        boxShadow: 'none',
      },
    },
  };

  return (
    <Button
      variant="contained"
      startIcon={icon}
      sx={{
        ...buttonStyles[variant],
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
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default ReusableButton;
