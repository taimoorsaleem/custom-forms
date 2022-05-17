import { ChangeEvent, FC } from 'react';
import styled from 'styled-components';

import { PreviewFormItem } from './previewFormItem';

const StyledPreviewContainer = styled.div`
  flex: 0.68;
  padding: 18px;
  padding-right: 0;
  label {
    font-size: 14px;
    font-weight: bold;
  }
`;

const StyledPreviewFormFieldsContainer = styled.div`
  margin-top: 8px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  padding: 12px;
  height: 328px;
  overflow-y: auto;
  > div {
    margin-bottom: 8px;
    input,
    textarea {
      width: calc(100% - 6px);
    }
  }
`;

type Props = {
  formControls: Array<any>;
  values?: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const PreviewForm: FC<Props> = ({ formControls, values, onChange }) => {
  return (
    <StyledPreviewContainer>
      <label>Preview</label>
      <StyledPreviewFormFieldsContainer>
        {formControls.map((formControl: any, index: number) => (
          <PreviewFormItem
            key={`${formControl.type}-${index}`}
            {...formControl}
            onChange={onChange}
            index={index}
            value={
              values[
                formControl?.metadata?.name || `${formControl.type}${index}`
              ]
            }
          />
        ))}
      </StyledPreviewFormFieldsContainer>
    </StyledPreviewContainer>
  );
};

PreviewForm.defaultProps = {
  values: {},
};
