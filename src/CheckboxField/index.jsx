import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.pcss';
import Input from '../Input';

@CSSModules(styles, { allowMultiple: true })
class CheckboxField extends React.Component {
  static meta = {
    wrapper: <fieldset />,
    label: <legend />,
    field_display: {
      '#description': 'NO_DESCRIPTION',
    },
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.props.onChange(e.target.checked);
  }

  getLabelPositionClass() {
      const labelClass = `display-${this.props.field['#title_display']}`;
      if(styles[labelClass]) {
          return labelClass;
      }
      return '';
  }

  render() {
    var cssClasses = 'input-wrapper ' + this.getLabelPositionClass();

    var attrs = {};
    this.props.webformElement.state.errors.length > 0 ? attrs['aria-invalid'] = 'true' : null;
    this.props.field['#required'] ? attrs['aria-required'] = 'true' : null;

    return (
      <div styleName={cssClasses}>
        <label htmlFor={this.key} styleName='checkbox-label'>
          <Input
            {...this.props}
            onChange={this.onChange}
            type='checkbox'
            styleName='checkbox'
            {...attrs}
          />
          <div styleName='indicator' />
          {this.props.field['#description']}
        </label>
      </div>
    );
  }
}

export default CheckboxField;
