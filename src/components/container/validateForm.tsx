import { ChangeEvent, FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  // Action
  updateStatus,
  validateFormData,
  // Memomized Selector
  getMemomizedActiveFormContorls,
  // Interface
  IFormControl,
  getMemomizedStatus,
} from './ducks/formSlice';
import { PreviewData } from '../molecule/previewData';
import { PreviewError } from '../molecule/previewErrors';
import { PreviewEvent } from '../molecule/previewEvent';
import { PreviewForm } from '../molecule/previewForm';
import { statusType } from '../../utils/constants';
import { AppDispatch } from '../../store';

const StyledPreviewSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledValidateContainerHeading = styled.h2`
  color: #d8d8d8;
  margin: 1em;
`;

const StyledOutputContainer = styled.div`
  flex: 0.3;
  padding: 18px;
  padding-left: 0;
`;

const StyledSubmitButton = styled.button`
  margin: 0 18px;
  background: #0d78fa;
  border: none;
  color: white;
  padding: 4px 12px;
  border-radius: 2px;
`;

export const ValidateForm: FC<{}> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /** Use State */
  const [form, setForm] = useState({});

  /** State Selector */
  const formControls: Array<IFormControl> = useSelector(getMemomizedActiveFormContorls);
  const status: string = useSelector(getMemomizedStatus);

  /*** Use Effect */
  useEffect(() => {
    if (status === statusType.SUCCESS) {
      navigate(-1);
    }
    return () => {
      if (status) {
        dispatch(updateStatus(''));
      }
    };
  }, [dispatch, navigate, status]);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value || event.target.checked,
    });
  };

  const handlePreviewSubmit = () => {
    dispatch(validateFormData());
  };

  return (
    <>
      <StyledValidateContainerHeading>Preview</StyledValidateContainerHeading>
      <StyledPreviewSection>
        <PreviewForm
          formControls={formControls}
          onChange={handleOnChange}
          values={form}
        />
        <StyledOutputContainer>
          <PreviewData values={form} />
          <PreviewError />
          <PreviewEvent />
        </StyledOutputContainer>
      </StyledPreviewSection>
      <StyledSubmitButton onClick={handlePreviewSubmit}>
        Submit
      </StyledSubmitButton>
    </>
  );
};
