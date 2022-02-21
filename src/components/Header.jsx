//Conceito  mais ANTIGO
// function Header(props) {

//Conceito mais moderno
function Header({ children, size }) {
  let fontSize = "text-xl";

  if (size === "large") {
    fontSize = "text-2xl";
  }
  return (
    <header>
      <div className="  bg-blue-200 mx-auto  p-10">
        {/* Antigo */}
        {/* <h1 className="text-center font-semibold text-xl">{props.children}</h1> */}

        {/* Novo */}
        <h1 className={`text-center font-semibold ${fontSize}`}>{children}</h1>
      </div>
    </header>
  );
}

export default Header;
