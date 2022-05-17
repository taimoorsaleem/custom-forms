import { FC } from 'react';

import { ComponentModels, IComponentModel } from '../../utils/constants';

type Props = {
  type: string;
  index: number;
  metadata?: any;
};

export const PreviewFormItem: FC<Props> = props => {
  const componentModel: IComponentModel = ComponentModels[props.type];

  return (
    <div>
      {props?.metadata?.label ? <label>{props?.metadata?.label}</label> : null}
      <componentModel.Component
        label={props?.metadata?.label}
        name={props?.metadata?.name}
        {...props}
      />
    </div>
  );
};
