import { FC, ChangeEvent } from 'react';

type Props = {
  name: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  metadata: any;
  index: number;
  value: string;
};

export const Checkbox: FC<Props> = ({
  name,
  checked,
  onChange,
  disabled,
  metadata,
  index,
  value,
}) => {
  return (
    <>
      {metadata?.options?.length ? (
        metadata.options.map((option: any, optionIndex: number) => (
          <div>
            <input
              type="checkbox"
              name={option.name || `checkbox${optionIndex}`}
              id={option.name}
              checked={option.checked}
              onChange={onChange}
              disabled={disabled}
              value=""
              style={{ width: '20px' }}
            />
            <label htmlFor={option.name}>{option.label}</label>
          </div>
        ))
      ) : (
        <input
          type="checkbox"
          name={name || `checkbox${index}`}
          id={name}
          value=""
          checked={!!value}
          onChange={onChange}
          disabled={disabled}
        />
      )}
    </>
  );
};

Checkbox.defaultProps = {
  disabled: false,
  onChange: () => {},
};
