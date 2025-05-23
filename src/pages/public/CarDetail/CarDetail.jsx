import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { NavLink, useParams } from "react-router";
import Slider from "react-slick";
import './CarDetail.css';
import IMG from "../../../assets/imgs/Whats.png";
import { useState } from "react";
import GenericInput from "../../../components/GenericInput/GenericInput";
import leftArrow from "../../../assets/left-arrow.svg";
import { useCarDetail } from "../../../hooks/useCarDetail";
import { useEffect } from "react";
import { useAllCars } from '../../../hooks/useAllCar'
import { useCarsFiltered } from '../../../hooks/useCarsFiltered'

import GenericLoader from "../../../components/GenericLoader/GenericLoader";
import Card from "../../../components/Card/CardCars";
export default function CarDetail() {
    const { id } = useParams();
    const { car, isLoading } = useCarDetail(id);
    const { others_cars } = useCarsFiltered(car?.mark);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")
    const { all_cars } = useAllCars()
    const [errors, setErrors] = useState({})
    const ViewportHeight = window.innerHeight;
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };
    const settings_mobile = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    const settings_others_cars = {
        infinite: false,
        speed: 500,
        slidesToShow: others_cars?.length > 10 ? 4 : others_cars?.length,
        slidesToScroll: 1,
        arrows: ViewportHeight <= 800 ? false : true,
        dots: true,
        autoplay: false,
        autoplaySpeed: 5000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }
    useEffect(() => {
        if (isLoading === false) {
            setMessage(`Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} continua disponível ?`)
        }

    }, [isLoading, car])

    const validation = () => {
        const newErros = {};
        if (!name.trim()) newErros.name = "Nome é obrigatório.";
        if (!email.trim()) newErros.email = "E-mail é obrigatório.";
        else if (!/\S+@\S+\.\S+/.test(email))
            newErros.email = "E-mail inválido.";
        if (!message.trim())
            newErros.message = "Mensagem é obrigatória.";


        return newErros;
    };

    const sendMessage = (e) => {

        e.preventDefault()
        const errors = validation();
        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        const mes = `${message} at.te ${name}`
        window.location.href = `https://api.whatsapp.com/send?phone=5500000000&text=${encodeURIComponent(mes)}`;
    }
    const chunkArray = (array, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            chunks.push(array.slice(i, i + chunkSize));
        }
        return chunks;
    };
    return (
        <>
            < Header />
            {ViewportHeight > 800 ? (
                <div className="content">

                    {isLoading ? (
                        <GenericLoader />
                    ) : (
                        <>
                            <NavLink to="/home" className="back-to-stock">
                                <img src={leftArrow} alt="Voltar" />
                                <p>Voltar para o estoque</p>
                            </NavLink>
                            <div className="container-car-detail">
                                <div className="spacing-imgs">
                                    <Slider {...settings}>
                                        {car?.imgs.map((url, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`${url}`}
                                                    alt={`Slide ${index + 1}`}
                                                    className="car-detail-img"
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                                <div className="car-detail-info">
                                    <div className="left-side-car-detail">
                                        <section>
                                            <div className="title-with-highlight">
                                                <h1 className="car-title">
                                                    {car?.mark} <span className="title-color">{car?.model}</span>
                                                </h1>
                                                {
                                                    car?.highlights && (
                                                        <span className="highlight-button">
                                                            <h3>
                                                                Em destaque
                                                            </h3>
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <h3 className="car-description">
                                                {car?.motors + ' ' + car?.traction + ' ' + car?.fuel}
                                            </h3>
                                        </section>
                                        <section>

                                            <section>
                                                <table className="car-details-table">
                                                    <tbody>
                                                        <tr>
                                                            <th>Ano</th>
                                                            <th>Kilometros</th>
                                                            <th>Câmbio</th>
                                                            <th>Carroceria</th>
                                                        </tr>
                                                        <tr>
                                                            <td>{car?.year}</td>
                                                            <td>{car?.kilometers}</td>
                                                            <td>{car?.transmission}</td>
                                                            <td>{car?.bodywork}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Combustível</th>
                                                            <th>Final de placa</th>
                                                            <th>Cor</th>
                                                            <th>Aceita troca?</th>
                                                        </tr>
                                                        <tr>
                                                            <td>{car?.fuel}</td>
                                                            <td>{car?.final_plate}</td>
                                                            <td>{car?.color}</td>
                                                            <td>{car?.trade ? "Sim" : "Não"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Blindagem?</th>
                                                            <th>Direção</th>
                                                        </tr>
                                                        <tr>
                                                            <td>{car?.blindage ? "Sim" : "Não"}</td>
                                                            <td>{car?.direction || "Não informado"}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </section>
                                        </section>
                                        <hr className="car-detail-divider" />
                                        <section className="car-detail-description-section">
                                            <h1>Descrição</h1>
                                            <p className="car-detail-description">
                                                {car?.description}
                                            </p>
                                        </section>
                                        <hr className="car-detail-divider" />
                                        <section>
                                            <h1>Itens do veículo</h1>
                                            <div className="items-table">
                                                {chunkArray(car.items, 4).map((row, rowIndex) => (
                                                    <div key={rowIndex} className="items-row">
                                                        {row.map((item, colIndex) => (
                                                            <div key={colIndex} className="item-cell">
                                                                {item}
                                                            </div>
                                                        ))}
                                                        {row.length < 4 &&
                                                            Array(4 - row.length)
                                                                .fill()
                                                                .map((_, colIndex) => (
                                                                    <div
                                                                        key={`empty-${colIndex}`}
                                                                        className="item-cell empty"
                                                                    />
                                                                ))}
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                    <div className="right-side-car-detail">
                                        <section>
                                            <h1 className="car-detail-price">
                                                {car?.price?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                            </h1>
                                            <p className="car-detail-price-description">
                                                Valor à vista
                                            </p>
                                            <hr className="car-detail-divider-right-side" />
                                            <h2 className="car-detail-vendor">
                                                Envie uma mensagem ao vendedor
                                            </h2>
                                            <a href={`http://wa.me/5500000000?text=Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} ainda esta disponível ? `} className="button-whats">
                                                <img src={IMG} alt="" />
                                                <div className="whats">
                                                    <p>
                                                        Fale conosco pelo
                                                    </p>
                                                    <h1>
                                                        WhatsApp
                                                    </h1>
                                                </div>
                                            </a>
                                            <div className="m-3">
                                                <GenericInput label={'Nome *'} theme="light" exemple={''} type={'text'} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Nome'} />
                                                {errors.name && <span className="error">{errors.name}</span>}
                                                <GenericInput label={'Email *'} theme="light" exemple={''} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
                                                {errors.email && <span className="error">{errors.email}</span>}
                                                <GenericInput label={'Mensagem *'} theme="light" exemple={''} type={'textarea'} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={'Mensagem'} />
                                                {errors.message && <span className="error">{errors.message}</span>}
                                            </div>
                                            <span className="ob-camps">Os campos marcados com <span className="red">*</span> são obrigatórios</span>
                                            <button className="button-send-message" onClick={(e) => sendMessage(e)}>
                                                Enviar Mensagem
                                            </button>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <div className="others-cars">
                                <h1>
                                    Outros veículos
                                </h1>
                                <div className="configure-others-cars" >
                                    <Slider {...settings_others_cars}>
                                        {others_cars?.map((car, index) => (
                                            <div key={car.id} className="configure-others-cars" >
                                                <Card disableSlideImgs={true} key={car.id_car} id={car.id_car} model={car.model} imgs={car.imgs} mark={car.mark} price={car.price} bodywork={car.bodywork} traction={car.traction} year={car.year} kilometers={car.kilometers} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </div>
                        </>
                    )}
                </div >
            ) : (
                isLoading ? (
                    <GenericLoader />
                ) : (
                    <div className="content-mobile">
                        <NavLink to="/home" className="back-to-stock">
                            <img src={leftArrow} alt="Voltar" />
                            <p>Voltar para o estoque</p>
                        </NavLink>
                        <div className="container-car-detail">
                            <div className="spacing-imgs">
                                <Slider {...settings_mobile}>
                                    {car?.imgs.map((url, index) => (
                                        <div key={index}>
                                            <img
                                                src={`${url}`}
                                                alt={`Slide ${index + 1}`}
                                                className="car-detail-img"
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <section className="car-detail-info-1-mobile">
                                <h1 className="car-title">
                                    {car?.mark} <span className="title-color">{car?.model}</span>
                                </h1>
                                <h3 className="car-description">
                                    {car?.motors + ' ' + car?.traction + ' ' + car?.fuel}
                                </h3>
                                <h3 className="car-detail-price">
                                    {car?.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                                </h3>
                                <p className="car-detail-price-description">
                                    Valor à vista
                                </p>
                                <hr className="car-detail-divider-right-side" />
                                <h2 className="car-detail-vendor">
                                    Envie uma mensagem ao vendedor
                                </h2>
                                <a href={`http://wa.me/55000000000?text=Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} ainda esta disponível ? `} className="button-whats">
                                    <img src={IMG} alt="" />
                                    <div className="whats">
                                        <p>
                                            Fale conosco pelo
                                        </p>
                                        <h1>
                                            WhatsApp
                                        </h1>
                                    </div>
                                </a>
                                <div className="m-3">
                                    <GenericInput label={'Nome'} theme="light" exemple={''} type={'text'} value={name} onChange={(e) => setName(e.target.value)} placeholder={'Nome'} />
                                    {errors.name && <span className="error">{errors.name}</span>}
                                    <GenericInput label={'Email'} theme="light" exemple={''} type={'email'} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={'Email'} />
                                    {errors.email && <span className="error">{errors.email}</span>}
                                    <GenericInput label={'Mensagem'} theme="light" exemple={''} type={'textarea'} value={message} onChange={(e) => setMessage(e.target.value)} placeholder={'Mensagem'} />
                                    {errors.message && <span className="error">{errors.message}</span>}
                                </div>
                                <button className="button-send-message" onClick={(e) => sendMessage(e)}>
                                    Enviar Mensagem
                                </button>
                            </section>
                            <hr className="car-detail-divider" />
                            <section>
                                <h1 className="resumed">Resumo</h1>
                                <hr className="car-detail-divider divider-2" />
                                <div className="container-information-mobile">
                                    <div class="item-esquerdo">
                                        <h1>Ano</h1>
                                        <p>
                                            {car?.year}
                                        </p>
                                    </div>
                                    <div class="item ">
                                        <h1>Kilometros</h1>
                                        <p>
                                            {car?.kilometers}
                                        </p>
                                    </div>
                                    <div class="item-esquerdo">
                                        <h1>Câmbio</h1>
                                        <p>
                                            {car?.transmission}
                                        </p>
                                    </div>
                                    <div class="item">
                                        <h1>Carroceria</h1>
                                        <p>
                                            {car?.bodywork}
                                        </p>
                                    </div>
                                    <div className="item-esquerdo">
                                        <h1>Combustível</h1>
                                        <p>
                                            {car?.fuel}
                                        </p>

                                    </div>
                                    <div className="item">
                                        <h1>Final de placa</h1>
                                        <p>
                                            {car?.final_plate}
                                        </p>
                                    </div>
                                    <div className="item-esquerdo">
                                        <h1>Cor</h1>
                                        <p>
                                            {car?.color}
                                        </p>
                                    </div>
                                    <div className="item">
                                        <h1>Aceita troca ? </h1>
                                        <p>
                                            {car?.trade ? 'Sim' : 'Não'}
                                        </p>
                                    </div>
                                    <div className="item-esquerdo">
                                        <h1>Blindagem ? </h1>
                                        <p>
                                            {car?.blindage ? 'Sim' : 'Não'}
                                        </p>
                                    </div>
                                    <div className="item">
                                        <h1>Direção</h1>
                                        <p>
                                            {car?.direction}
                                        </p>
                                    </div>
                                </div>
                            </section>
                            <section>
                                <h1>Itens do veículo</h1>
                                <div className="items-table-mobile">
                                    {car.items.map((item, index) => (
                                        <div key={index} className="item-cell-mobile">
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </section>
                            <hr className="car-detail-divider divider-2" />
                            <section>
                                <div className="others-cars">
                                    <h1>
                                        Outros veículos
                                    </h1>
                                    <Slider {...settings_others_cars}>
                                        {others_cars?.map((car, index) => (
                                            <div key={car.id} className="configure-others-cars" >
                                                <Card disableSlideImgs={true} key={car.id_car} id={car.id_car} model={car.model} imgs={car.imgs} mark={car.mark} price={car.price} bodywork={car.bodywork} traction={car.traction} year={car.year} kilometers={car.kilometers} />
                                            </div>
                                        ))}
                                    </Slider>
                                </div>
                            </section>
                        </div>
                    </div>
                )
            )
            }
            <Footer />
        </>
    )
}