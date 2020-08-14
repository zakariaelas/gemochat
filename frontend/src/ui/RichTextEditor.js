import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import MUIRichTextEditor from 'mui-rte';
import { convertToRaw } from 'draft-js';
import _ from 'lodash';

const RichTextEditor = ({ hash, value, onChange }) => {
  const saveToLocalStorage = useCallback(
    _.debounce((state) => {
      const contentState = convertToRaw(state.getCurrentContent());
      onChange(JSON.stringify(contentState));
      localStorage.setItem(hash, JSON.stringify(contentState));
    }, 500),
    [hash],
  );

  return (
    <MUIRichTextEditor
      toolbarButtonSize="small"
      onChange={(state) => {
        saveToLocalStorage(state);
      }}
      defaultValue={value}
      controls={[
        'title',
        'bold',
        'italic',
        'underline',
        'strikethrough',
        'numberList',
        'bulletList',
        'quote',
      ]}
    />
  );
};

RichTextEditor.propTypes = {
  hash: PropTypes.string.isRequired,
};

export default RichTextEditor;
