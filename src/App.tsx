import { useState } from 'react';
import './App.css'
import logo from './assets/logo.png'
import mulher from './assets/MULHER-PESO.png'
import emailjs from '@emailjs/browser';
import { useRef } from 'react';
import food from './assets/food.png'
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

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (form.current) {
      emailjs
        .sendForm('service_6z66jbr', 'template_ute7rif', form.current, 'DzmDNzwMy-TsMf4Rn')
        .then(
          () => {
            console.log('SUCCESS!');
      
          },
          (error) => {
            console.log('FAILED...', error.text);
          },
        );
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Executar o cálculo do GET
    calcularGET(e);

    // Se o cálculo foi bem-sucedido, enviar o e-mail
    sendEmail(e);

    console.log('Obrigado! Em breve entraremos em contato.');
  };

  return (
    <>
     <div id="hero">
      <header>
        <img src={logo} alt="" />
      </header>
      <div id="hero-content">
        <div className="hero-text">
          <h1>Descubra o caminho para sua melhor versão!</h1>
          <p>Calcule seu gasto calórico total e entenda as reais necessidades do seu corpo.</p>
        </div>
        <img src={mulher} alt="" />
      </div>
     </div>

<section id="bullet-img">
<div className="text-bullet">
  <h1>
    Por quê calcular seu gasto calórico total?
  </h1>

  <p>
    A saúde não é uma fórmula mágica, mas entender as necessidades do seu corpo é o primeiro passo para uma rotina mais saudável e equilibrada.
  </p>

  <p>Benefícios de um cálculo personalizado</p>

  <ul>
    <li>Crie uma alimentação que funciona pra você</li>
    <li>Saiba quantas calorias consumir para perder peso ou ganhar massa muscular. </li>
    <li>Otimize seus treinos e veja resultados mais rápidos.</li>
    <li>Acompanhe sua evolução e mantenha-se motivado.</li>
  </ul>
</div>

<img src={food} alt="" />
</section>
<div className="divide"></div>

     <div id="form">


  
      <h1>Comece agora e transforme sua rotina!</h1>
      <p>Preencha o formulário e tenha acesso imediato à sua calculadora personalizada!</p>
      <form className="calc" onSubmit={handleSubmit}>
      <label>
        <p>Seu Peso</p>
        <input
          type="number"
          placeholder="kg"
          value={peso}
          name='peso'
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
          name='altura'
          onChange={(e) => setAltura(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Idade</p>
        <input
          type="number"
          value={idade}
          name='idade'
          onChange={(e) => setIdade(e.target.value)}
          required
        />
      </label>
      <label>
        <p>Sexo</p>
        <select value={sexo} 
        name='sexo'
        onChange={(e) => setSexo(e.target.value)}>
          <option value="f">Feminino</option>
          <option value="m">Masculino</option>
        </select>
      </label>
      <label>
        <p>Atividade Física</p>
        <select
          value={atividade}
          name='atividade'
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
        name='result'
        value={result ? `${result} kcal/dia` : ""}
        readOnly
      />
</label>
      <input className="calcular" value="CALCULAR AGORA!" type="submit"/>
      </form>
     </div>
    </>
  )
}

