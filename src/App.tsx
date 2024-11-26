import { useState } from 'react';
import './App.css'
import logo from './assets/logo.png'
import mulher from './assets/MULHER-PESO.png'
import {ContactUs} from './email';
export default function App() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("f");
  const [atividade, setAtividade] = useState<"sedentario" | "leve" | "moderado" | "intenso">("sedentario");
  const [result, setResult] = useState("");

  const calcularGET = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Verificar se os campos estão preenchidos
    if (!peso || !altura || !idade) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    // Conversão dos valores
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);
    const idadeNum = parseInt(idade);

    // Cálculo da TMB (Fórmula de Harris-Benedict)
    let tmb;
    if (sexo === "f") {
      tmb = 655 + 9.6 * pesoNum + 1.8 * alturaNum - 4.7 * idadeNum;
    } else {
      tmb = 66 + 13.7 * pesoNum + 5 * alturaNum - 6.8 * idadeNum;
    }

    // Multiplicador de atividade física
    const atividadeFactor: { [key in "sedentario" | "leve" | "moderado" | "intenso"]: number } = {
      sedentario: 1.2,
      leve: 1.375,
      moderado: 1.55,
      intenso: 1.725,
    };

    // Cálculo do GET
    const get = tmb * atividadeFactor[atividade];

    // Atualizar o resultado
    setResult(get.toFixed(2));
  };
  return (
    <>
     <div id="hero">
      <header>
        <img src={logo} alt="" />
      </header>
      <div id="hero-content">
        <div className="hero-text">
          <h1>Descubra seu peso ideal hoje!</h1>
          <p>Calcule seu Índice de Massa Corporal para alcançar seus objetivos de bem-estar.</p>
        </div>
        <img src={mulher} alt="" />
      </div>
     </div>

     <div id="form">
    <h1>Deixe seu contato</h1>
    <p>
      Preencha o formulário e tenha acesso imediato à sua calculadora personalizada!
    </p>

    <ContactUs />
  
      <div className="divide"></div>
      <h1>Transforme sua vida Hoje</h1>
      <p>Preencha o formulário e tenha acesso imediato à sua calculadora personalizada!</p>
      <form className="calc" onSubmit={calcularGET}>
      <label>
        <p>Seu Peso</p>
        <input
          type="number"
          placeholder="kg"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Estatura</p>
        <input
          type="number"
          placeholder="cm"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Idade</p>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Sexo</p>
        <select value={sexo} onChange={(e) => setSexo(e.target.value)}>
          <option value="f">Feminino</option>
          <option value="m">Masculino</option>
        </select>
      </label>
      <label>
        <p>Atividade Física</p>
        <select
          value={atividade}
          onChange={(e) => setAtividade(e.target.value as "sedentario" | "leve" | "moderado" | "intenso")}
        >
          <option value="sedentario">Sedentário (0 dias por semana.)</option>
          <option value="leve">Leve (1 a 2 dias por semana.)</option>
          <option value="moderado">Moderado (3 a 4 dias por semana)</option>
          <option value="intenso">Intenso(5 a 7 dias por semana)</option>
        </select>
      </label>
<label >
  <p>Você deve consumir:</p>
<input
        type="text"
        className="result"
        value={result ? `${result} kcal/dia` : ""}
        readOnly
      />
</label>
      <button className="calcular" type="submit">
        CALCULAR AGORA!
      </button>
      </form>
     </div>
    </>
  )
}

