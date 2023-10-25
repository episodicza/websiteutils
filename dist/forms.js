var epsForms = (function (exports) {
  'use strict';

  function gtmFormEvent(data, form) {
    const event = {
      event: "form_submission",
      formId: form.attr('id'),
      formType: form.data('type') || 'form'
    };
    if (event.formType === 'lead') {
      event.formProduct = form.data('product') || null;
      event.emailAddress = data.fields.email || null;
      event.phoneNumber = data.fields.phone_e164 || data.fields.phone || null;
      event.firstName = data.fields.first_name || data.fields.firstName || null;
      event.lastName = data.fields.last_name || data.fields.lastName || null;
    }  window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);
  }


  function initFormValidation(formId, validationRules={}, successHandler=null) {
    let form = $(document.getElementById(formId));

    jQuery.validator.addMethod(
      "validPhoneNumber",
      function (value, element) {
        if (value.trim()) {
          const iti = window.intlTelInputGlobals.getInstance(element);
          return iti.isValidNumber() && iti.getNumber().length > 11;
        }
        return true;
      }, "Invalid phone number"
    );

    const telInputs = $("input[type='tel']", form);
    telInputs.each(function() {
      let iti = window.intlTelInputGlobals.getInstance(this);
      if (iti != null) { iti.destroy(); }
      const fieldConfig = {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        initialCountry: "za", //onlyCountries: ["za"],
        allowDropdown: false,
        autoPlaceholder: "aggressive",
        hiddenInput: this.name + "_e164"
      };
      iti = window.intlTelInput(this, fieldConfig);
    });

    let baseOptions = {
      errorClass: "form-error",
      validClass: "form-valid",
      errorPlacement: function (error, element) {
        if (element.parent().hasClass("iti")) {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        $(element).addClass("field-error").removeClass("field-valid");
      },
      unhighlight: function (element, errorClass, validClass) {
        $(element).addClass("field-valid").removeClass("field-error");
      },
      submitHandler: function (formElement) {
        const _form = $(formElement);
        const submitBtn = _form.find("input[type='submit']");
        submitBtn.prop("disabled", true).css("cursor", "progress");
        const doneBlock = $(".w-form-done", _form.parent());
        const failBlock = $(".w-form-fail", _form.parent());
        
        const data = {
          fields: Object.fromEntries(new FormData(formElement)),
          meta: { 
            href: window.location.href, 
            path: window.location.pathname, 
          }
        };

        fetch(_form.attr("action"), {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(response => {
          //TODO: check response.ok ?

          gtmFormEvent(data, _form);
          if (successHandler) {
            try { successHandler(data); } catch (e) { console.log(e); }
          }

          const successRedirect = _form.attr("redirect") || _form.data("redirect") || null;
          if (successRedirect) {
            window.location.href = successRedirect;
          } else {
            _form.hide();
            failBlock.hide();
            doneBlock.show();
            $([document.documentElement, document.body]).animate({
              scrollTop: doneBlock.offset().top - 250,
            }, 300);
          }
          submitBtn.prop("disabled", false).css("cursor", "default");
        }).catch(error => {
          console.log(error);
          _form.show();
          failBlock.show();
          doneBlock.hide();
          submitBtn.prop("disabled", false).css("cursor", "default");
        });
      }
    };
    form.validate({ ...baseOptions, ...validationRules});
  }

  exports.initFormValidation = initFormValidation;

  return exports;

})({});
