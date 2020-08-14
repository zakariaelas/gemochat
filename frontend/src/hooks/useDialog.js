import { useState, useCallback } from 'react';

const useDialog = (initialState = false) => {
  const [open, setDialogOpen] = useState(initialState);

  const handleClose = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleOpen = useCallback(() => {
    setDialogOpen(true);
  }, []);

  return [open, { handleClose, handleOpen, setDialogOpen }];
};

export default useDialog;
