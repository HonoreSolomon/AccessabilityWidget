// Create an Immediately Invoked Function Expression (IIFE) that encapsulates the entire script
const AccessabilityWidget = (function () {
  // Store references to important HTML elements
  const elements = {
    root: document.querySelector(":root"),
    htmlEl: document.querySelector("html"),
    accessabilityWidget: document.querySelector("#accessability-widget"),
    accessabilityBtn: document.querySelector("#accessability-button"),
    closeBtn: document.querySelector("#accessability-button-close"),
    resetBtn: document.querySelector("#accessability-button-reset")
  };

  // Define a class called Radio
  class Radio {
    #el;
    #name;
    #size;
    constructor(id, size) {
      // Store a reference to the HTML element that represents this radio button
      this.#el = document.querySelector(id);
      // Store the name of this radio button's group
      this.#name = this.#el.getAttribute("name");
      // Store the size of this radio button
      this.#size = size;

      this.id = id;
    }
    // Get whether or not this radio button is checked
    getIsChecked() {
      return this.#el.getAttribute("checked");
    }
    // Get the HTML element that represents this radio button
    getEl() {
      return this.#el;
    }
    // Get the name of this radio button's group
    getName() {
      return this.#name;
    }
    // Get the size of this radio button
    getSize() {
      return this.#size;
    }
    // Set an event listener that will trigger a callback function
    setEventListener(changeFunction) {
      this.getEl().addEventListener("change", changeFunction);
    }
  }

  // Define a factory function that creates new Radio subclasses with custom event listener callbacks
  function createCustomRadioClass(changeFunctions) {
    class CustomRadio extends Radio {
      constructor(id, size) {
        super(id, size);
        const name = this.getName();
        const changeFunction = changeFunctions[name] || function () {};
        this.setEventListener(changeFunction.bind(this));
      }
    }
    return CustomRadio;
  }

  // Define custom change functions for each radio group
  const changeFunctions = {
    // Define a function called "changeFontSize" that will set the font size of the root HTML element based on the selected radio button
    letter: function () {
      elements.root.style.setProperty("--font-size", this.getSize());
      localStorage["checkedletter"] = this.id;
    },

    // Define a function called "changeCursorSize" that will set the size of the cursor based on the selected radio button
    cursor: function () {
      elements.root.style.setProperty("--cursor-size", `url("${this.getSize()}"), auto`);
      localStorage["checkedcursor"] = this.id;
    }
  };

  // Create a custom Radio class for each radio group using the factory function
  const LetterRadio = createCustomRadioClass(changeFunctions);
  const CursorRadio = createCustomRadioClass(changeFunctions);

  // Create a factory function that returns an object with each type of radio button
  function createRadios() {
    return {
      letter: {
        letterBase: new LetterRadio("#letter-base", "16px"),
        letterMd: new LetterRadio("#letter-md", "17px"),
        letterLg: new LetterRadio("#letter-lg", "18px")
      },
      cursor: {
        cursorBase: new CursorRadio("#cursor-base", ""),
        cursorMd: new CursorRadio("#cursor-md", "/site/templates/img/cursor-md.cur"),
        cursorLg: new CursorRadio("#cursor-lg", "/site/templates/img/cursor-lg.png")
      }
      // add more radio types as needed
    };
  }
  // Define a function called "toggleClass" that will toggle a CSS class on a given HTML element
  const toggleClass = (element, cssClass) => element.classList.toggle(cssClass);

  //define a function called "setup" that checks localStorage for checked values and sets them
  const setup = radios => {
    Object.keys(radios).forEach(radioGroup => {
      // For each radio button in the group
      Object.values(radios[radioGroup]).forEach(radio => {
        // if radio is stored as checked
        if (radio.id === localStorage[`checked${radioGroup}`]) {
          // Check the radio button
          radio.getEl().checked = true;
          // Get the name of the radio group
          const name = radio.getName();
          // Get the change function for the radio group, or use an empty function if none is defined
          const changeFunction = changeFunctions[name] || function () {};
          // Call the change function with the size of the radio button as an argument, bound to the radio button object as "this"
          changeFunction.call(radio, radio.getSize());
        }
      });
    });
  };

  const init = () => {
    // Use the factory function to create the radios object
    const radios = createRadios();
    setup(radios);
    // Define a function called "reset" that will reset all radio buttons to their default values
    const reset = () =>
      // For each radio group
      Object.values(radios).forEach(radioGroup => {
        // For each radio button in the group
        Object.keys(radioGroup).forEach(radio => {
          // Get the radio button object
          const radioObj = radioGroup[radio];
          // If the radio button is the "Base" button
          if (radio === `${radioObj.getName()}Base`) {
            // Check the radio button
            radioObj.getEl().checked = true;
            // Get the name of the radio group
            const name = radioObj.getName();
            // Get the change function for the radio group, or use an empty function if none is defined
            const changeFunction = changeFunctions[name] || function () {};
            // Call the change function with the size of the radio button as an argument, bound to the radio button object as "this"
            changeFunction.call(radioObj, radioObj.getSize());
          }
        });
      });

    // Add an event listener to the "accessibilityBtn" HTML element that will toggle the "hide" CSS class on the "accessabilityWidget" element
    elements.accessabilityBtn.addEventListener("click", () =>
      toggleClass(elements.accessabilityWidget, "hide")
    );
    // Add an event listener to the "closeBtn" HTML element that will toggle the "hide" CSS class on the "accessabilityWidget" element
    elements.closeBtn.addEventListener("click", () =>
      toggleClass(elements.accessabilityWidget, "hide")
    );
    // Add an event listener to the "resetBtn" HTML element that will call the reset function on cli
    elements.resetBtn.addEventListener("click", reset);

    // Adds event listeners to each radio btn that will detect a change in the selected radio.
    Object.values(radios).forEach(radioGroup => {
      Object.values(radioGroup).forEach(radio => {
        radio.setEventListener();
      });
    });
  };

  // Return the "accessibilityWidget" object
  return {
    init
  };
})();

export default AccessabilityWidget;
