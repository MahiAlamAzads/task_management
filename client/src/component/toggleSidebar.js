const toggleSidebar = document.getElementById("sidebarIcon");
console.log(toggleSidebar)
const mainSidebar = document.getElementById("main-sidebar");
console.log("toggleSidebar loaded"); // <-- MUST show

toggleSidebar?.addEventListener("click", () => {
    console.log("clicked")
    mainSidebar.classList.toggle("hidden");
});
