const container = document.querySelector(".container");
const userInput = document.getElementById("userInput");
const submitBtn = document.getElementById("submit");
const downloadBtn = document.getElementById("download");
const sizeOptions = document.querySelector(".sizeOptions");
const BGColor = document.getElementById("BGColor");
const FGColor = document.getElementById("FGColor");

let QR_Code;
let sizeChoice = sizeOptions.value;
let BGColorChoice = "#ffffff";
let FGColorChoice = "#377dff";

// Update size choice
sizeOptions.addEventListener("change", () => {
  sizeChoice = sizeOptions.value;
});

// Update background color
BGColor.addEventListener("input", () => {
  BGColorChoice = BGColor.value;
});

// Update foreground color
FGColor.addEventListener("input", () => {
  FGColorChoice = FGColor.value;
});

// Format input for download filename
const inputFormatter = (value) => {
  return value.replace(/[^a-z0-9A-Z]+/g, "");
};

// Generate QR code on button click
submitBtn.addEventListener("click", () => {
  if (userInput.value.trim() === "") {
    alert("Please enter some text or URL.");
    return;
  }

  container.innerHTML = "";

  QR_Code = new QRCode(container, {
    text: userInput.value,
    width: parseInt(sizeChoice),
    height: parseInt(sizeChoice),
    colorDark: FGColorChoice,
    colorLight: BGColorChoice,
  });

  // Wait a bit for QR to render before getting image
  setTimeout(() => {
    const canvas = container.querySelector("canvas");
    if (!canvas) return;

    const src = canvas.toDataURL("image/png");
    downloadBtn.href = src;

    let filename;
    try {
      filename = new URL(userInput.value).hostname;
    } catch (_) {
      filename = inputFormatter(userInput.value);
    }

    downloadBtn.download = `${filename}_QR.png`;
    downloadBtn.classList.remove("hide");
  }, 200);
});

// Optional: live hide download button when user types
userInput.addEventListener("input", () => {
  downloadBtn.classList.add("hide");
});

// Initial setup on page load
window.onload = () => {
  container.innerHTML = "";
  sizeOptions.value = 100;
  BGColor.value = BGColorChoice;
  FGColor.value = FGColorChoice;
  userInput.value = "";
  downloadBtn.classList.add("hide");
};
