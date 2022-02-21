import Eleicoes from "./components/Eleicoes";
import Header from "./components/Header";
import Main from "./components/Main";
import Select from "./components/Select";

export default function App() {

  return (
    <div>
      <Header>React Eleições</Header>

      <Main>
        <div className="text-center">
          <label>Escolha o Municipio</label>
          <br />
          <Select />
        </div>

        <br />
        <Eleicoes></Eleicoes>
      </Main>
    </div>
  );
}
