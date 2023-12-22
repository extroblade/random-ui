import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const MODAL_ROOT = 'modal-root';

export const Portal = ({ children }: PropsWithChildren) => {
  const [root, setRoot] = useState<HTMLElement>();
  useEffect(() => {
    const el = document.getElementById(MODAL_ROOT);
    if (!el) return;
    setRoot(() => el as HTMLElement);
  }, []);

  if (!root) return <></>;
  return ReactDOM.createPortal(children, root);
};
