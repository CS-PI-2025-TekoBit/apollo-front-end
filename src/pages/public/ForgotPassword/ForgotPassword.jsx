// import React, { useState } from 'react';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import './ForgotPassword.css'; // Importa o CSS da tela de recuperação de senha

// function ForgotPassword() {
//   const [email, setEmail] = useState('');
//   const [erro, setErro] = useState('');
//   const [enviando, setEnviando] = useState(false);
//   const navigate = useNavigate();

//   const validacao = () => {
//     if (email === '') {
//       setErro('Campo e-mail é obrigatório');
//       return false;
//     }
//     setErro('');
//     return true;
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setEnviando(true);

//     if (!validacao()) {
//       setEnviando(false);
//       return;
//     }

//     // Simula o envio do e-mail para recuperação de senha
//     setTimeout(() => {
//       toast.success('Link para recuperação enviado para seu e-mail!', {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//       });
//       setEnviando(false);
//       navigate('/login');
//     }, 2000);
//   };

//   return (
//     <div className="forgot-password-container">
//       <div className="forgot-password-bg"></div>
//       <div className="forgot-password-modal">
//         <h1>Recuperação de Senha</h1>
//         <form onSubmit={handleSubmit} className="forgot-password-form">
//           <p>Digite seu e-mail para receber um link de recuperação de senha</p>
//           <div className="input-form">
//             <label htmlFor="email">E-mail</label>
//             <input
//               type="email"
//               id="email"
//               placeholder="Digite seu e-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//           {erro && <span className="error">{erro}</span>}
//           <button type="submit" className="btn-enter" disabled={enviando}>
//             {enviando ? 'Enviando...' : 'Confirmar'}
//           </button>
//           <button type="button" className="btn-cancel" onClick={() => navigate('/login')}>Cancelar</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPassword;
