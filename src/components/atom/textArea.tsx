import { FC, ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledTextArea = styled.textarea`
  width: 100%;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  resize: vertical;
  min-height: 24px;
`;

type Props = {
  rows?: number;
  name: string;
  label: string;
  index: number;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
};

export const TextArea: FC<Props> = ({
  rows,
  name,
  label,
  index,
  value,
  onChange,
  disabled,
}) => {
  return (
    <StyledTextArea
      rows={rows}
      name={name || `text${index}`}
      placeholder={label}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

TextArea.defaultProps = {
  rows: 4,
  label: '',
  value: '',
  onChange: () => {},
  disabled: false,
};
