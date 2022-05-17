import { FC, MouseEvent } from 'react';

type Props = {
  type?: any;
  theme?: string;
  size?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode
  className?: string;
  text: string;
  disabled?: boolean;
};

export const Button: FC<Props> = ({
  type = 'button',
  onClick,
  children,
  className,
  text,
  disabled,
}) => {
  return (
    <button
      type={type || 'button'} 
      onClick={onClick}
      disabled={disabled}
      className={className}
    >
      {text}
      {children}
    </button>
    );
};

Button.defaultProps = {
  disabled: false,
  type: 'button',
  onClick: () => {},
};
