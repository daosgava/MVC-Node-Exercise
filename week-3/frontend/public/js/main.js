const options = {
  opacity: 0.5,
  inDuration: 300,
  outDuration: 200,
};

// Initialize Materialize CSS modals
const modalElements = document.querySelectorAll('.modal');
M.Modal.init(modalElements, options);

// Initialize Materialize CSS sidenav
const sidenavElement = document.querySelectorAll('.sidenav');
M.Sidenav.init(sidenavElement, options);
