import { FC, ChangeEvent, useState } from 'react';
import { FiUpload } from 'react-icons/fi';
import styled from 'styled-components';

const StyledLabel = styled.label`
  display: inline-block;
  border: 1px dashed #d5d5d5;
  border-radius: 20px;
  padding: 12px 8px;
  font-size: 12px;
`;

const StyledUploadIcon = styled(FiUpload)`
  margin: 0 4px;
  height: 18px;
  width: auto;
  vertical-align: middle;
`;

type Props = {
  name: string;
  label: string;
  index: number;
  onChange: Function;
  disabled?: boolean;
};

function handleFileChange(onChange: Function, name: string, setFileName: Function) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const fileList: FileList = event?.currentTarget?.files || new FileList();
    const reader = new FileReader();
    reader.addEventListener('load', (event: any) => {
      const result = event?.target?.result;
      onChange({
        target: {
          value: result,
          name,
        },
      });
    });

    if (fileList?.length) {
      setFileName(fileList[0].name);
      reader.readAsDataURL(fileList[0]);
    }
  };
}

export const FileUpload: FC<Props> = ({
  name,
  label,
  onChange,
  disabled,
  index,
}) => {
  const [fileName, setFileName] = useState('Choose File');
  return (
    <StyledLabel>
      <StyledUploadIcon />
      <input
        type="file"
        name={name || `file${index}`}
        id={name}
        placeholder={label}
        style={{ display: 'none' }}
        onChange={handleFileChange(onChange, name || `file_upload${index}`, setFileName)}
        disabled={disabled}
      />
      <span style={{ verticalAlign: 'middle' }}>{fileName}</span>
    </StyledLabel>
  );
};

FileUpload.defaultProps = {
  disabled: false,
};
