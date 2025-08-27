// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import { Key, CheckCircle } from '@phosphor-icons/react';
// import logo from '../../../assets/imgs/logomarca.png';
// import '../ForgotPassword/ForgotPassword.css';

// function ResetPassword() {
//     const navigate = useNavigate();

//     const [form, setForm] = useState({
//         newPassword: '',
//         confirmPassword: '',
//     });

//     const [errors, setErrors] = useState({});
//     const [requirements, setRequirements] = useState({
//         length: false,
//         number: false,
//         special: false,
//         uppercase: false,
//     });

//     const validarSenha = (senha) => {
//         setRequirements({
//             length: senha.length >= 8 && senha.length <= 20,
//             number: /[0-9]/.test(senha),
//             special: /[!@#$%^&*(),.?":{}|<>_\-+=~`]/.test(senha),
//             uppercase: /[A-Z]/.test(senha),
//         });
//     };

//     const handleChange = (field, value) => {
//         setForm({ ...form, [field]: value });
//         if (field === 'newPassword') {
//             validarSenha(value);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         const newErrors = {};

//         if (form.newPassword !== form.confirmPassword) {
//             newErrors.confirmPassword = 'As senhas não coincidem.';
//         }

//         if (!requirements.length || !requirements.number || !requirements.special || !requirements.uppercase) {
//             newErrors.newPassword = 'A senha não atende aos requisitos.';
//         }

//         if (Object.keys(newErrors).length > 0) {
//             setErrors(newErrors);
//             return;
//         }

//         setErrors({});
//         toast.success('Senha redefinida com sucesso! Faça login novamente.');
//         navigate('/');
//     };

//     return (
//         <main className="forgot-background">
//             <div className="forgot-modal">
//                 <img src={logo} alt="Apollo" className="forgot-logo" />

//                 <h1>Redefinição de Senha</h1>
//                 <p>Informe sua nova senha e confirme abaixo</p>

//                 <form onSubmit={handleSubmit}>
//                     {/* Senha */}
//                     <div className="input-form">
//                         <label htmlFor="newPassword">Senha</label>
//                         <span className="icon"><Key size={22} color="black" /></span>
//                         <input
//                             type="password"
//                             id="newPassword"
//                             placeholder="Digite sua nova senha"
//                             value={form.newPassword}
//                             onChange={(e) => handleChange('newPassword', e.target.value)}
//                             className={`${errors.newPassword ? 'error-input' : ''}`}
//                         />
//                     </div>
//                     {errors.newPassword && <span className="error">{errors.newPassword}</span>}

//                     {/* Lista de requisitos */}
//                     <ul className="password-requirements">
//                         <li className={requirements.length ? 'met' : 'unmet'}>
//                             <CheckCircle size={16} /> 8 a 20 caracteres
//                         </li>
//                         <li className={requirements.number ? 'met' : 'unmet'}>
//                             <CheckCircle size={16} /> Pelo menos 1 número
//                         </li>
//                         <li className={requirements.special ? 'met' : 'unmet'}>
//                             <CheckCircle size={16} /> Pelo menos 1 caractere especial
//                         </li>
//                         <li className={requirements.uppercase ? 'met' : 'unmet'}>
//                             <CheckCircle size={16} /> Pelo menos 1 letra maiúscula
//                         </li>
//                     </ul>

//                     {/* Confirmar senha */}
//                     <div className="input-form">
//                         <label htmlFor="confirmPassword">Confirmar Senha</label>
//                         <span className="icon"><Key size={22} color="black" /></span>
//                         <input
//                             type="password"
//                             id="confirmPassword"
//                             placeholder="Confirme sua senha"
//                             value={form.confirmPassword}
//                             onChange={(e) => handleChange('confirmPassword', e.target.value)}
//                             className={`${errors.confirmPassword ? 'error-input' : ''}`}
//                         />
//                     </div>
//                     {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

//                     {/* Ações */}
//                     <div className="actions-forgot">
//                         <Link to="/" className="btn-backs">Voltar</Link>
//                         <button type="submit" className="btn-confirm">Confirmar</button>
//                     </div>
//                 </form>
//             </div>
//         </main>
//     );
// }

// export default ResetPassword;
