# jQuery Dynamic Textarea
A dynamic-sized textarea plugin for jQuery.  This plugin will resize textareas as a user types, based on the content in the textarea.

## Usage
```javascript
jQuery('textarea').dynamicTextarea();

// Options are also available:
jQuery('textarea').dynamicTextarea({
  'line-height': '20px', // Optional.  Will attempt to detect if not provided.
  'max-height': '500px' // Optional.  Will be set to 20 lines if not provided.
});
```

## Notes
The textarea line height should be specified in pixels, or this may not work correctly.
