import { useRef } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
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

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Nome</label>
      <input type="text" name="from_name" required/>
      <label>Email</label>
      <input type="email" name="email" required />
      <label>Contato</label>
      <input type='number' name="phone" required/>
      <input type="submit" value="Deixar contato!"  onClick={
        () => {
          alert('Obrigado! Em breve entraremos em contato.');}
      }/>
    </form>
  );
};