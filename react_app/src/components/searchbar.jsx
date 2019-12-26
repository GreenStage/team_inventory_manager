/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import Octicon, {Search} from '@primer/octicons-react';

export default function SearchBar({ placeholder, onChange, onKeyUp, onKeyDown, onSubmit, className }) {
  return (
    <div className={`input-group ${className}`}>
      <input
        type="search"
        placeholder={placeholder}
        className="form-control search"
        onChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
      />
      <div className="input-group-append">
        <button
          id="button-addon6"
          type="button"
          onClick={onSubmit}
          className="btn btn-info"
        >
          <Octicon icon={Search} verticalAlign='middle'	/>
        </button>
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  onChange: () => {},
  onSubmit: () => {},
  onKeyUp: () => {},
  onKeyDown: () => {},
  className: '',
  placeholder: 'What\'re you searching for?',
};
