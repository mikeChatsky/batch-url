import React from 'react';
import { Field, FieldProps } from 'formik';
import { GoLink } from 'react-icons/go';
import { AiFillMinusCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { Box } from '@smooth-ui/core-sc';

import LinkInput from './LinkInput';
import IconLink from '../IconLink';

const DeleteIcon = styled(AiFillMinusCircle)`
  margin: 0 10px;
  color: ${({
    theme: {
      colors: { error }
    }
  }) => error};
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

const PaddedBox = styled(Box)`
  padding: 10px;
`;

const LinkField: React.FC<{
  name: string;
  onDelete: () => void;
  error?: string;
}> = ({ name, onDelete, error }) => {
  const errorProp = error ? { error: true } : {};

  return (
    <PaddedBox row alignItems="center">
      <Field name={name}>
        {({ field }: { field: FieldProps<any> }) => (
          <IconLink Icon={GoLink} {...errorProp}>
            <LinkInput field={field}></LinkInput>
          </IconLink>
        )}
      </Field>
      <DeleteIcon size="20" onClick={onDelete} />
    </PaddedBox>
  );z
};

export default LinkField;
