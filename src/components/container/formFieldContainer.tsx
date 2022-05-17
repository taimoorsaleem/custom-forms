import { FC, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FiDownload } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import {
  // Actions
  updateControl,
  saveForm,
  selectForm,
  fetchForms,
  // Memomized Selector
  getMemomizedActiveForm,
  getMemomizedForm,
  getMemomizedStatus,
  // Interface
  IFormState,
  IFormControl,
  updateStatus,
} from './ducks/formSlice';
import { AppDispatch } from '../../store';
import { ControlDropZone } from './controlDropZone';
import { statusType } from '../../utils/constants';

const StyledSaveButton = styled.button`
  width: 200px;
  display: block;
  margin: 0 auto;
  background: #0d78fa;
  color: white;
  border: none;
  border-radius: 16px;
  height: 30px;
  cursor: pointer;
  position: relative;
`;

const StyledDownloadIcon = styled(FiDownload)`
  position: absolute;
  left: 12px;
`;

const StyledFormFieldContainer = styled.div`
  width: calc(100% - 250px);
  min-height: 600px;
  overflow-x: none;
  overflow-y: auto;
`;

export const FormFieldContainer: FC<{}> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  /** Store Selector */
  const form: IFormState = useSelector(getMemomizedActiveForm);
  const forms: Array<IFormState> = useSelector(getMemomizedForm);
  const status: string = useSelector(getMemomizedStatus);

  /** Handlers Callbacks */
  const selectFormCallback = useCallback(() => {
    if (id && form.id !== Number(id)) {
      dispatch(selectForm({ id: Number(id) }));
    }
  }, [id, form]);

  /** UseEffects */
  useEffect(() => {
    if (!forms.length) dispatch(fetchForms());
  }, []);
  useEffect(selectFormCallback, [selectFormCallback]);
  useEffect(() => {
    if (status === statusType.INVALID_URL) {
      dispatch(updateStatus(''));
      navigate('create');
    }
  }, [status]);

  const setFormControls = (controls: Array<IFormControl>) => {
    dispatch(updateControl(controls));
  };

  const updateFormControls = (index: number, payload: any) => {
    const controls = form.controls.slice();
    controls[index] = {
      ...form.controls[index],
      ...payload,
      position: index,
    };
    dispatch(updateControl(controls));
  };

  const handleSaveForm = () => {
    dispatch(saveForm({ ...(id && { id: Number(id) }) }));
    navigate('/create');
  };

  return (
    <StyledFormFieldContainer>
      <ControlDropZone
        formComponents={form.controls}
        setFormControls={setFormControls}
        updateFormControls={updateFormControls}
      />
      {form.controls.length ? (
        <StyledSaveButton onClick={handleSaveForm}>
          <StyledDownloadIcon />
          Save
        </StyledSaveButton>
      ) : null}
    </StyledFormFieldContainer>
  );
};
