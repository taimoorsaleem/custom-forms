import { FC, useState, useEffect, ChangeEvent } from 'react';

import { Modal, IModalState } from './modal';
import { Field, InputStyled } from './style';
import { StyledCancelButton, StyledSaveButton } from './footer';

type Props = {
  type: string;
  openModal: boolean;
  metadata: any;
  handleFormSubmit: Function;
  closeModal: Function;
};

export const TextAreaModal: FC<Props> = ({
  type,
  openModal,
  metadata,
  handleFormSubmit,
  closeModal,
}) => {
  /** Use State */
  const [modalState, setModalState] = useState<IModalState>({});
  
  /** Use Effect */
  useEffect(() => {
    if (metadata && Object.keys(metadata).length) {
      setModalState(metadata);
    }
  }, [metadata]);

  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleFormSubmit({ metadata: modalState });
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setModalState({});
    closeModal(false);
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    modalState[event.target.name] = event.target.value;
    setModalState(modalState);
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
    </Modal>
  );
};
