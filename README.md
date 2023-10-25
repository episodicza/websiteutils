# websiteutils
Utility scripts for Episodic Website

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

