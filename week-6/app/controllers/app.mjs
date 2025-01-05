const getAppController = () => {
  const handleHomeRoute = (_, res) => {
    res.render("index.html", { title: "Notifications App" });
  };

  return {
    handleHomeRoute,
  };
};

export default getAppController;
