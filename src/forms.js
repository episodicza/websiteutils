

function loadItiForForm(form) {
    let telInputs = $(":input[type='tel']", form);
    telInputs.each(function () {
      let iti = window.intlTelInputGlobals.getInstance(this);
      if (iti != null) { iti.destroy(); }
      iti = window.intlTelInput(this, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        onlyCountries: ["za"],
        allowDropdown: true,
        autoPlaceholder: "aggressive",
        hiddenInput: this.name + "_e164",
      });
    });
  }
  