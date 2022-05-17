import { FC, useState, useEffect, ChangeEvent } from 'react';

import { Modal, IModalState } from './modal';
import { Field, InputStyled, Button } from './style';
import { StyledCancelButton, StyledSaveButton } from './footer';

interface IOptions {
  label: string;
  name: string;
  value: boolean;
}

type Props = {
  openModal: boolean;
  type: string;
  metadata: any;
  handleFormSubmit: Function;
  closeModal: Function;
};

export const CheckBoxModal: FC<Props> = ({
  openModal,
  type,
  metadata,
  handleFormSubmit,
  closeModal,
}) => {
  /** Use State */
  const [modalState, setModalState] = useState<IModalState>({
    name: '',
    label: '',
  });
  const [options, setOptions] = useState<Array<IOptions>>([]);

  /** Use Effect */
  useEffect(() => {
    if (metadata?.options?.length) {
      setOptions(metadata.options);
    }
  }, [metadata]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmit({
      metadata: {
        options,
      },
    });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalState({
      name: '',
      label: '',
    });
    setOptions([]);
    closeModal(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setModalState({
      ...modalState,
      [event.target.name]: event.target.value,
    });
  };

  const footer = (
    <>
      <StyledCancelButton
        type="button"
        text="Cancel"
        onClick={handleCloseModal}
      />
      <StyledSaveButton type="submit" text="Save" />
    </>
  );

  const handleAddOption = () => {
    if (!modalState?.label || !modalState?.name) {
      alert('Please add label and name for checkbox option');
      return;
    }
    setOptions([
      ...options,
      {
        label: modalState.label,
        name: modalState.name,
        value: false,
      },
    ]);
    setModalState({
      name: '',
      label: '',
    });
  };

  return (
    <Modal
      key={`${type}-modal`}
      active={openModal}
      footer={footer}
      title="Tool name"
      hideModal={handleCloseModal}
      handleSubmit={handleSubmit}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <Field>
          <label>Name</label>
          <InputStyled
            type="text"
            name="name"
            onChange={handleOnChange}
            value={modalState['name']}
          />
        </Field>
        <Field>
          <label>Label</label>
          <InputStyled
            type="text"
            name="label"
            onChange={handleOnChange}
            value={modalState['label']}
          />
        </Field>
      </div>
      <div>
        <Field>
          {options.map((option: any, index: number) => (
            <>
              <input
                type="checkbox"
                id={`${option.label}-${index}`}
                name={option.name}
                checked={option.value}
                onChange={handleOnChange}
              />
              <label>{option.label}</label>
            </>
          ))}
          <Button type='button' onClick={handleAddOption}>Add</Button>
        </Field>
      </div>
    </Modal>
  );
};
