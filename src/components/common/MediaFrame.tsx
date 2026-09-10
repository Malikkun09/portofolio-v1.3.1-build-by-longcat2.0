import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type MediaFrameProps = {
  children: ReactNode;
  ratio: string;
  className?: string;
  style?: CSSProperties;
} & Omit<HTMLAttributes<HTMLDivElement>, 'style' | 'children'>;

export function MediaFrame({ children, ratio, className, style, ...rest }: MediaFrameProps) {
  return (
    <div
      data-media-frame
      className={className}
      style={{ position: 'relative', overflow: 'hidden', aspectRatio: ratio, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}
