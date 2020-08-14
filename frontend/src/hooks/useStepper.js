import { useState, useCallback, useMemo } from 'react';

const useStepper = (size) => {
  const [activeStep, setActiveStep] = useState(0);

  const goto = useCallback(
    (step) => {
      if (step < 0 || step >= size) return;
      setActiveStep(step);
    },
    [setActiveStep, size],
  );

  const next = useCallback(() => {
    if (activeStep >= size - 1) return;
    setActiveStep((activeStep) => activeStep + 1);
  }, [activeStep, size]);

  const prev = useCallback(() => {
    if (activeStep <= 0) return;
    setActiveStep((activeStep) => activeStep - 1);
  }, [activeStep]);

  const canNext = useMemo(() => activeStep < size - 1, [
    activeStep,
    size,
  ]);

  const canPrev = useMemo(() => activeStep > 0, [activeStep]);

  return [activeStep, { goto, next, prev, canNext, canPrev, size }];
};

export default useStepper;
