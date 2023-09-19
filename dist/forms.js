var epsForms = (function (exports) {
  'use strict';

  function initFormValidation(formId, validationRules={}, fieldOptions={}, successHandler=null) {
    let form = document.getElementById(formId);

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

    //Load ITI for the tel fields
    const telInputs = form.querySelectorAll("input[type='tel']");
    telInputs.forEach(function(telInput) {
      let iti = window.intlTelInputGlobals.getInstance(telInput);
      if (iti != null) { iti.destroy(); }
      const defaultConfig = {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        onlyCountries: ["za"],
        allowDropdown: true,
        autoPlaceholder: "aggressive",
        hiddenInput: telInput.name + "_e164"
      };
      iti = window.intlTelInput(telInput, {...defaultConfig, ...fieldOptions});
    });

    let baseOptions = {
      errorClass: "form-error",
      validClass: "form-valid",
      errorPlacement: function (error, element) {
        if (element.parentElement.classList.contains("iti")) {
          error.insertAfter(element.parent());
        } else {
          error.insertAfter(element);
        }
      },
      highlight: function (element, errorClass, validClass) {
        element.classList.add(errorClass).classList.remove(validClass);
      },
      unhighlight: function (element, errorClass, validClass) {
        element.classList.add(validClass).classList.remove(errorClass);
      },
      submitHandler: async function(form) {
        const submitBtn = form.querySelector("input[type='submit']");
        submitBtn.style.cursor = "progress";
        submitBtn.disabled = true;
        const doneBlock = form.parentElement.querySelector(".w-form-done");
        const failBlock = form.parentElement.querySelector(".w-form-fail");
        
        let data = {
          fields: Object.fromEntries(new FormData(formElem)),
          meta: { href: window.location.href },
        };

        fetch(form.getAttribute("action"), {
          method: form.getAttribute("method") || "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then(response => {
          if (successCallback) {
            successCallback(data);
          }
          const successRedirect = form.getAttribute("redirect") || form.dataset.redirect || null;
          if (successRedirect) {
            window.location.href = successRedirect;
          } else {
            form.style.display = 'none';
            failBlock.style.display = 'none';
            doneBlock.style.display = 'block';
            $([document.documentElement, document.body]).animate({
              scrollTop: doneBlock.offset().top - 250,
            }, 300);
          }
          submitBtn.disabled = false;
          submitBtn.style.cursor = "default";
        }).catch(error => {
          console.log(error);
          form.style.display = 'block';
          doneBlock.style.display = 'none';
          failBlock.style.display = 'block';
          submitBtn.disabled = false;
          submitBtn.style.cursor = "default";
        });
      }
    };
    $(form).validate({ ...baseOptions, ...validationRules});
  }

  exports.initFormValidation = initFormValidation;

  return exports;

})({});
