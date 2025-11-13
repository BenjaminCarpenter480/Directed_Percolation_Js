
// Await document loaded 
document.addEventListener("DOMContentLoaded", () => {

    //Get handle on var box and other elements of note
    const boxHeader = document.querySelector(".box-header");
    const varBox = document.querySelector(".var-box");
    const icon = document.querySelector(".var-box-header .icon");

    // Add click event listner to header
    boxHeader.addEventListener("click", () => {
        
        // Toggle collapsed class on var box
        varBox.classList.toggle("collapsed");
        
        // Check if box minimised and from this change icon
        if (varBox.classList.contains("collapsed")) {
            icon.textContent = "▲"; // Up arrow when collapsed
        } else {
            icon.textContent = "▼"; // Down arrow when expanded
        }
    });
});
