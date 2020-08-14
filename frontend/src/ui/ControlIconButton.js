import { styled } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';

const ControlIconButton = styled(IconButton)({
  border: '1px solid #fff',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
});

export default ControlIconButton;
