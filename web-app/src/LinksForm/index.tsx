import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { Button, Box, Boxer } from '@smooth-ui/core-sc';
import Axios from 'axios';
import * as yup from 'yup';

import StretchingBoxer from '../components/StretchingBoxer';
import { GoPlus } from 'react-icons/go';
import LinkField from './LinkField';

const onSubmit = async (links: Array<string>): Promise<void> => {
  const id = await Axios.post('/bookmark', links);

  console.log(id);
};

const validationSchema = yup.object().shape({
  links: yup.array(yup.string().url())
});

const LinksForm: React.FC = () => (
  <StretchingBoxer row justifyContent="center" alignItems="center">
    <Formik
      onSubmit={async (values): Promise<void> => {
        await onSubmit(values.links);
      }}
      initialValues={{
        links: ['https://www.facebook.com/', 'https://www.google.com/']
      }}
      validationSchema={validationSchema}
    >
      {({ values: { links }, errors }) => (
        <Box row justifyContent="center" forwardedAs={Form}>
          <Boxer col={3 / 6} my="10px">
            <FieldArray
              name="links"
              render={arrayHelpers => (
                <>
                  {links && links.length ? (
                    links.map((link, index) => (
                      <LinkField
                        key={index}
                        name={`links.${index}`}
                        onDelete={() => arrayHelpers.remove(index)}
                        error={errors && errors.links && errors.links[index]}
                      ></LinkField>
                    ))
                  ) : (
                    <span>add new</span>
                  )}
                  <Box row justifyContent="center">
                    <Button
                      variant="secondary"
                      onClick={() => arrayHelpers.insert(links.length, '')}
                    >
                      <GoPlus />
                    </Button>
                  </Box>
                </>
              )}
            />
          </Boxer>
          <Box col={1 / 6} justifyContent="center" alignItems="center" row>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      )}
    </Formik>
  </StretchingBoxer>
);

export default LinksForm;