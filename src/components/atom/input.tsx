import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
width: 100%;
border: 1px solid #d5d5d5;
border-radius: 4px;
height: 24px;`;

type Props =  {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  type?: string;
  name?: string;
  label: string;
  index: number;
  disabled?: boolean;
};

export const Input: FC<Props> = ({
  onChange,
  value,
  type,
  name,
  disabled,
  label,
  index,
}) => {
  return (
    <StyledInput
      type={type}
      value={value}
      onChange={onChange}
      name={name || `input${index}`}
      placeholder={label}
      disabled={disabled}
    />
  );
};

Input.defaultProps = {
  onChange: () => {},
  value: '',
  type: 'text',
  label: '',
  disabled: false,
};
