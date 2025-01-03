import * as React from 'react';
import { styled } from '@mui/material/styles';
import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';

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

export default function CustomizedCheckbox() {
  return (
    <div>
      <BpCheckbox />
    </div>
  );
}
