import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import getNested from 'get-nested';
import WebformElement from '../WebformElement';
import FormStore from '../Webform/FormStore';
import styles from './styles.pcss';

@CSSModules(styles, { allowMultiple: true })
class Fieldset extends Component {
  static meta = {
    wrapper: <fieldset className={styles.fieldset} />,
    label: <legend data-extendClassName={styles['fieldset-legend']} />,
    labelVisibility: 'invisible',
  };

  static propTypes = {
    field: PropTypes.shape({
      composite_elements: PropTypes.array,
      '#webform_key': PropTypes.string.isRequired,
    }).isRequired,
    formStore: PropTypes.instanceOf(FormStore).isRequired,
    webformElement: PropTypes.instanceOf(WebformElement).isRequired,
    onChange: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    settings: PropTypes.shape().isRequired,
    children: PropTypes.node,
    webformSettings: PropTypes.shape().isRequired,
    style: PropTypes.shape(),
    webformPage: PropTypes.string,
    form: PropTypes.shape({
      settings: PropTypes.object.isRequired,
    }).isRequired,
    status: PropTypes.string.isRequired,
  };

  static defaultProps = {
    children: [],
    style: {},
    webformPage: null,
  };

  /**
   * Get value from field based on key. Checks overridden values, and if so, provides master value
   *
   * @param field Full field object
   * @param key Key without leading #, e.g. pattern
   *
   * @return any Value of field or master, depending of overrides.
   */
  static getValue(field, key) {
    if(key.startsWith('#')) {
      throw new Error('Please use the field without leading hash.');
    }

    if(field[`#override_${key}`]) {
      return field[`#${key}`];
    }

    return getNested(() => field.composite_elements.find(element => element['#key'] === key)['#default_value'], null);
  }

  getFormElements() {
    const formElements = this.props.field.composite_elements || [];
    return formElements.map(field =>
      (<WebformElement
        key={field['#webform_key']}
        field={field}
        formStore={this.props.formStore}
        parent={this.props.webformElement}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur}
        settings={this.props.settings}
        webformSettings={this.props.webformSettings}
        webformPage={this.props.webformPage}
        form={this.props.form}
        status={this.props.status}
      />));
  }

  render() {
    const formElements = this.getFormElements();
    return (
      <div style={this.props.style} styleName='fieldset-inner'>
        {this.props.children}
        {formElements}
      </div>
    );
  }
}

export default Fieldset;
