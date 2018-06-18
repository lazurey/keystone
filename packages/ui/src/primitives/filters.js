import React, { Children, Component } from 'react';
import Select, { components as reactSelectComponents } from 'react-select';
import {
  CheckboxGroup as _CheckboxGroup,
  Checkbox as _Checkbox,
  RadioGroup as _RadioGroup,
  Radio as _Radio,
} from 'react-radios';

import { GrabberIcon } from '../../../icons';
import { colors, gridSize } from '../theme';
import { CheckboxPrimitive, RadioPrimitive } from './forms';
import { FlexGroup } from './layout';

// ==============================
// Control Stuff
// ==============================

const ControlLabel = ({ isChecked, isDisabled, ...props }) => {
  const type = Children.toArray(props.children)[0].props.type;
  const borderRadius = type === 'checkbox' ? 3 : '2em';

  return (
    <label
      css={{
        alignItems: 'center',
        border: `1px solid ${colors.N10}`,
        borderRadius,
        display: 'flex',
        fontSize: '0.75em',
        fontWeight: 500,
        lineHeight: 1,
        transition: 'border-color 150ms linear',
        width: '100%',
        userSelect: 'none',

        ':hover, :focus': {
          borderColor: colors.N20,
        },
        ':active': {
          backgroundColor: colors.N05,
        },
      }}
      {...props}
    />
  );
};
const StretchGroup = props => <FlexGroup stretch {...props} />;

// checkbox
export const CheckboxGroup = props => (
  <_CheckboxGroup component={StretchGroup} {...props} />
);
const ButtonCheckbox = props => (
  <CheckboxPrimitive components={{ Label: ControlLabel }} {...props} />
);
export const Checkbox = props => (
  <_Checkbox component={ButtonCheckbox} {...props} />
);

// radio
export const RadioGroup = props => (
  <_RadioGroup component={StretchGroup} {...props} />
);
const ButtonRadio = props => (
  <RadioPrimitive components={{ Label: ControlLabel }} {...props} />
);
export const Radio = props => <_Radio component={ButtonRadio} {...props} />;

// ==============================
// Select Stuff
// ==============================

export const OptionPrimitive = ({
  children,
  isFocused,
  isSelected,
  innerProps: { innerRef, ...innerProps },
}) => {
  const hoverAndFocusStyles = {
    backgroundColor: colors.B.L90,
    color: colors.primary,
  };
  const focusedStyles = isFocused ? hoverAndFocusStyles : null;
  const selectedStyles = isSelected
    ? {
        '&, &:hover, &:focus, &:active': {
          backgroundColor: colors.primary,
          color: 'white',
        },
      }
    : null;

  return (
    <div
      ref={innerRef}
      css={{
        alignItems: 'center',
        backgroundColor: colors.N05,
        borderRadius: 3,
        cursor: 'pointer',
        display: 'flex',
        fontSize: '0.9em',
        justifyContent: 'space-between',
        marginBottom: 4,
        outline: 0,
        padding: `${gridSize}px ${gridSize * 1.5}px`,

        ':active': {
          backgroundColor: colors.B.L80,
          color: colors.primary,
        },

        ...focusedStyles,
        ...selectedStyles,
      }}
      {...innerProps}
    >
      {children}
    </div>
  );
};

const selectStyles = {
  control: (provided, { isFocused }) => {
    const focusStyles = isFocused
      ? {
          borderColor: colors.primary,
          boxShadow: `inset 0 1px 1px rgba(0, 0, 0, 0.075),
      0 0 0 3px ${colors.B.A20}`,
          outline: 0,
        }
      : null;
    return {
      ...provided,
      ...focusStyles,
      fontSize: '0.9em',
      minHeight: 35,
      minWidth: '200px',
    };
  },
  menu: () => ({ marginTop: 8 }),
  menuList: provided => ({ ...provided, padding: 0 }),
};

const Control = ({ selectProps, ...props }) => {
  return selectProps.shouldDisplaySearchControl ? (
    <reactSelectComponents.Control {...props} />
  ) : (
    <div
      css={{
        border: 0,
        clip: 'rect(1px, 1px, 1px, 1px)',
        height: 1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        whiteSpace: 'nowrap',
        width: 1,
      }}
    >
      <reactSelectComponents.Control {...props} />
    </div>
  );
};

const DropdownIndicator = () => (
  <div
    css={{
      color: colors.N30,
      marginRight: 2,
      marginTop: 2,
      textAlign: 'center',
      width: 32,
    }}
  >
    <GrabberIcon />
  </div>
);

const defaultComponents = {
  Control,
  Option: OptionPrimitive,
  DropdownIndicator,
  IndicatorSeparator: null,
};

export class OptionRenderer extends Component {
  constructor(props) {
    super(props);
    this.cacheComponents(props.components);
  }
  static defaultProps = { displaySearch: true };
  componentWillReceiveProps(nextProps) {
    if (nextProps.components !== this.props.components) {
      this.cacheComponents(nextProps.components);
    }
  }
  cacheComponents = (components?: {}) => {
    this.components = {
      ...defaultComponents,
      ...components,
    };
  };
  render() {
    const { displaySearch, innerRef, ...props } = this.props;
    return (
      <Select
        backspaceRemovesValue={false}
        captureMenuScroll={false}
        closeMenuOnSelect={false}
        controlShouldRenderValue={false}
        filterOption={null}
        hideSelectedOptions={false}
        isClearable={false}
        maxMenuHeight={1000}
        menuIsOpen
        menuShouldScrollIntoView={false}
        shouldDisplaySearchControl={displaySearch}
        ref={innerRef}
        styles={selectStyles}
        tabSelectsValue={false}
        {...props}
        components={this.components}
      />
    );
  }
}
