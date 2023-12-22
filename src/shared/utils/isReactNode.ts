import { isValidElement, ReactNode } from 'react';

export function isReactNode(child: unknown): child is ReactNode {
  return isValidElement(child);
}
