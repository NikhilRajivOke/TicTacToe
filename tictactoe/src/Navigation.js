export const Navigation = () => {
  const navLinks = ["Profile", "Records", "Stats","Login"];
  return (
    <nav className="nav">
      <div className="logo">
        {" "}
        <strong>T</strong>ic-<strong>T</strong>ac-<strong>T</strong>oe
      </div>
      <div className="nav-links">
        {navLinks.map((link, index) => {
          return (
            <a key={index} href="#">
              {link}
            </a>
          );
        })}
      </div>
    </nav>
  );
};
