import { FC } from 'react';
import styled from 'styled-components';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoCopyOutline } from 'react-icons/io5';
import { AiOutlineDrag } from 'react-icons/ai';

const StyledFormFieldEditorContainer = styled.div`
  position: absolute;
  z-index: 1;
  right: 34px;
  top: 34px;
  border: 1px solid #d5d5d5;
  background: #f6f6f6;
  padding: 4px 8px;
  border-radius: 16px;
  svg {
    vertical-align: middle;
    width: auto;
    height: 18px;
    margin: 0 2px;
  }
`;

type Props = {
  index: number;
  setOpenModal: Function;
  handleDeleteControl: Function;
  handleCopyControl: Function;
};

export const FormFieldEditor: FC<Props> = ({
  setOpenModal,
  handleDeleteControl,
  index,
  handleCopyControl,
}) => {
  return (
    <StyledFormFieldEditorContainer>
      <AiOutlineDrag />
      <IoCopyOutline onClick={() => handleCopyControl(index)} />
      <MdOutlineEdit onClick={() => setOpenModal(true)} />
      <RiDeleteBin6Line onClick={() => handleDeleteControl(index)} />
    </StyledFormFieldEditorContainer>
  );
};
