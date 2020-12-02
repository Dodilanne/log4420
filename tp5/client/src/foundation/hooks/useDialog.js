import { useState, useRef, useEffect } from 'react';

const useDialog = (timeoutDuration = 5000) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeout = useRef();

  const clear = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  const hide = () => setIsVisible(false);

  const show = () => {
    clear();
    setIsVisible(true);
    timeout.current = setTimeout(hide, timeoutDuration);
  };

  useEffect(() => clear, []);

  return {
    isVisible,
    show,
    hide,
  };
};

export default useDialog;
