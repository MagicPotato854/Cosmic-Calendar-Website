function openModal(name, imgSrc, text) {
  document.getElementById("modalTitle").innerText = name;
  document.getElementById("modalImage").src = imgSrc;
  document.getElementById("modalText").innerText = text;
  document.getElementById("planetModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("planetModal").style.display = "none";
}

// Close modal when clicking outside content
window.addEventListener("click", function (event) {
  if (event.target === document.getElementById("planetModal")) {
    closeModal();
  }
});
