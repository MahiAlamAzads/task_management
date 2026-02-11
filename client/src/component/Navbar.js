function createNavbar() {
    // Navbar stored in a JS variable
    const app = document.getElementById("app");
    const navbar = `
        <nav class="bg-gray-800 p-4">
          <div class="container mx-auto flex justify-between items-center">
            <!-- Logo -->
            <a href="#" class="text-white font-bold text-xl">MyApp</a>

            <!-- Links -->
            <div class="space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">Home</a>
              <a href="#" class="text-gray-300 hover:text-white">About</a>
              <a href="#" class="text-gray-300 hover:text-white">Services</a>
              <a href="#" class="text-gray-300 hover:text-white">Contact</a>
            </div>
          </div>
        </nav>
    `;


    // Example: inject into DOM
    app.insertAdjacentHTML("afterbegin", navbar);
}
createNavbar()