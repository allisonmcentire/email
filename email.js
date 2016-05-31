/**
 * Implements hook_field_widget_form().
 */
function email_field_widget_form(form, form_state, field, instance, langcode, items, delta, element) {
    try {
        // Set the input type to a email.
        items[delta].type = 'email';
    }
    catch (error) { console.log('email_field_widget_form - ' + error); }
}

/**
 * Implements hook_field_formatter_view().
 */
function email_field_formatter_view(entity_type, entity, field, instance, langcode, items, display) {
    try {
        
        /*dpm(entity_type);
         dpm(entity);
         dpm(field);
         dpm(instance);
         dpm(langcode);
         dpm(items);
         dpm(display);*/
        
        // Iterate over each item, and place a widget onto the render array.
        var content = {};
        $.each(items, function(delta, item) {
               // Grab the text to display, then display it is a email link or
               // plain text.
               var text = item.value;
               if (display.type == 'email_link') {
               if (!empty(display.settings.title)) { text = display.settings.title; }
               content[delta] = {
               theme: 'email_link',
               text: text,
               path: null,
               attributes: {
               href: 'mailto:+' + item.value.replace('+', '')
               }
               };
               }
               else { content[delta] = { markup: text }; }
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
        if (!variables.attributes['data-icon']) {
            variables.attributes['data-icon'] = 'envelope';
        }
        return theme('button_link', variables);
    }
    catch (error) { console.log('theme_email_link - ' + error); }
}