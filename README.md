# websiteutils
Utility scripts for Episodic Website

## Webflow tab anchors
Add a <body> script for each page that has a tab element that you want to be able to switch tabs to using a URL parameter. This script looks for a ?tab=xyz parameter and then switches to the tab page that has an ID of xyz. It needs to run on page load so that the click handler will process.

```html
<script>
$(function(){
  const tabName = new URLSearchParams(window.location.search).get("tab");
  if (tabName){ $('#' + tabName).triggerHandler('click'); }    
});
</script>
```


## Using forms.js

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/css/intlTelInput.css">
<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@18.2.1/build/js/intlTelInput.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.5/additional-methods.min.js"></script>
```

Then in the footer:

```js
const rules = {
  rules: {
    email: {
      email: true,
      require_from_group: [1, "[data-require-from-group='contact']"],
    },
    phone: {
      require_from_group: [1, "[data-require-from-group='contact']"],
      validPhoneNumber: true,
    }
  },
  messages: {
    email: {
      email: "Invalid email address",
      require_from_group: "Phone and/or email needed",
    },
    phone: {
      require_from_group: "Phone and/or email needed",
    }
  }
};
epsForms.initFormValidation("form-id", rules);
```

## Building and uploading

`npm run build`

