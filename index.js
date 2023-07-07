// Scheme format options

const schemes = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "complement",
  "analogic-complement",
  "triad",
  "quad",
];

// Load default color and scheme (black && monochrome)

window.addEventListener("load", () => {
  let html = "";
  schemes.forEach(
    (scheme) =>
      (html += `<option value="${scheme}">${
        scheme.charAt(0).toUpperCase() + scheme.slice(1)
      }</option>`)
  );
  document.getElementById("scheme-selection").innerHTML = html;
  getColorScheme();
});

// Get the hex code from the color input type and the color scheme from the select input type

let inputColor = "000000";
let colorScheme = schemes[0];

document.addEventListener("change", (e) => {
  if (e.target.id === "color-input") {
    inputColor = e.target.value.slice(1);
  } else if (e.target.id === "scheme-selection") {
    colorScheme = e.target.value;
  }
});

// Request data from the Color API when clicking the btn

document.getElementById("generate-btn").addEventListener("click", (e) => {
  e.preventDefault();
  getColorScheme();
});

// Function that retrieves the color scheme and generates the html for the colour palette.

const getColorScheme = () => {
  fetch(
    `https://www.thecolorapi.com/scheme?hex=${inputColor}&mode=${colorScheme}`,
    {
      method: "GET",
      "Content-Type": "application/json",
    }
  )
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("color-scheme").innerHTML = "";
      data.colors.forEach((color) => {
        const divEl = document.createElement("div");
        divEl.style.backgroundColor = color.hex.value;

        const pEl = document.createElement("p");
        pEl.classList.add("color-hex");
        pEl.addEventListener("click", (e) => {
          const popupMsg = document.getElementById("copy-popup");
          popupMsg.textContent = `Hex code ${color.hex.value} copied to clipboard`;
          navigator.clipboard.writeText(e.target.textContent);
          popupMsg.classList.add("visible");
          setTimeout(() => {
            popupMsg.classList.remove("visible");
          }, 2000);
        });
        pEl.textContent = `${color.hex.value}`;

        divEl.append(pEl);
        document.getElementById("color-scheme").append(divEl);
      });
    });
};
