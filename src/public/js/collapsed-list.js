/**
 * Collapsed List
 * Ref: https://www.w3schools.com/howto/howto_js_treeview.asp
 */
const toggler = document.getElementsByClassName("caret");
for (let i = 0; i < toggler.length; i++) {
    toggler[i].addEventListener("click", function () {
        this.parentElement.querySelector(".nested").classList.toggle("active");
        this.classList.toggle("caret-down");
    });
}