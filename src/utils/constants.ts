import {
  InputModal,
  TextAreaModal,
  CheckBoxModal,
  FileUploadModal,
} from '../components/molecule/modal';
import {
  Divider,
  Input,
  TextArea,
  Checkbox,
  FileUpload,
} from '../components/atom';

export interface IFormControl {
  label: string;
  type: string;
}

export const FormControls: Array<IFormControl> = [
  {
    label: 'Input',
    type: 'input',
  },
  {
    label: 'Checkbox',
    type: 'checkbox',
  },
  {
    label: 'File Uploader',
    type: 'file_upload',
  },
  {
    label: 'Text',
    type: 'text',
  },
  {
    label: 'Divider',
    type: 'divider',
  },
];

export interface IComponentModel {
  label: string;
  Component: React.FunctionComponent<any>;
  ComponentModal?: React.FunctionComponent<any> | null;
}
export interface IComponentModels {
  [key: string]: IComponentModel;
}

export const ComponentModels: IComponentModels = {
  divider: {
    Component: Divider,
    label: 'Divider',
    ComponentModal: null,
  },
  input: {
    Component: Input,
    label: 'Input',
    ComponentModal: InputModal,
  },
  text: {
    Component: TextArea,
    label: 'Text',
    ComponentModal: TextAreaModal,
  },
  file_upload: {
    Component: FileUpload,
    label: 'File Upload',
    ComponentModal: FileUploadModal,
  },
  checkbox: {
    Component: Checkbox,
    label: 'Checkbox',
    ComponentModal: CheckBoxModal,
  },
};

export const dragTypes = {
  ITEM: 'item',
  RE_ARRANGE: 're_arrange',
};

export const dragTypeValue = Object.values(dragTypes);
export const statusType = {
  SUCCESS: 'success',
  INVALID_URL: 'invalid_url',
};
