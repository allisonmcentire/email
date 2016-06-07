/**
 * Implements hook_field_widget_form().
 */
function email_field_widget_form(form, form_state, field, instance, langcode, items, delta, element) {
  try {
    //console.log(form);
    //console.log(form_state);
    //console.log(field);
    //console.log(instance);
    //console.log(langcode);
    //console.log(items);
    //console.log(element);

    // Change it to an email input.
    items[delta].type = 'email';

    // Determine either the default value or item value, if either, then set the attribute value.
    var value = '';
    if (instance.default_value && instance.default_value.length) {
      value = instance.default_value[0].email;
    }
    if (items[delta].item && items[delta].item.email) {
      value = items[delta].item.email;
    }
    items[delta].options.attributes.value = value;

  }
  catch (error) { console.log('email_field_widget_form - ' + error); }
}

/**
 * Implements hook_field_formatter_view().
 */
function email_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
  try {
    //console.log(entity_type);
    //console.log(entity);
    //console.log(field);
    //console.log(instance);
    //console.log(langcode);
    //console.log(items);
    //console.log(display);

    // Iterate over each item, and place a widget onto the render array.
    var content = {};
    $.each(items, function(delta, item) {
      switch (display.type) {
        case 'email_default':
          content[delta] = {
            theme: 'email_link',
            text: item.email,
            path: null,
            attributes: {
              href: 'mailto:+' + item.email
            }
          };
          break;
        case 'email_plain':
          content[delta] = { markup: item.email };
          break;
        default:
          console.log('WARNING: email_field_formatter_view - unsupported display type: ' + display.type);
          break;
      }
    });
    return content;
  }
  catch (error) { console.log('email_field_formatter_view - ' + error); }
}

/**
 *
 */
function theme_email_link(variables) {
  try {
    if (!variables.attributes['data-icon']) { variables.attributes['data-icon'] = 'mail'; }
    return theme('button_link', variables);
  }
  catch (error) { console.log('theme_email_link - ' + error); }
}

/**
 * Implements hook_assemble_form_state_into_field().
 */
function email_assemble_form_state_into_field(entity_type, bundle, form_state_value, field, instance, langcode, delta, field_key, form) {
  try {
    field_key.value = "email";
    return form_state_value;
  }
  catch (error) { console.log('hook_assemble_form_state_into_field - ' + error); }
}
