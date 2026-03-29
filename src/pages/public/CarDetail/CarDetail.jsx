import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import { NavLink, useParams } from "react-router";
import Slider from "react-slick";
import './CarDetail.css';
import IMG from "../../../assets/imgs/Whats.png";
import { useState, useEffect } from "react";
import GenericInput from "../../../components/GenericInput/GenericInput";
import leftArrow from "../../../assets/left-arrow.svg";
import { useCarDetail } from "../../../hooks/useCarDetail";
import { useCarsFiltered } from '../../../hooks/useCarsFiltered'
import BotaoWhatsApp from "../../../components/BotaoWhatsApp/BotaoWhatsApp";
import GenericLoader from "../../../components/GenericLoader/GenericLoader";
import Card from "../../../components/Card/CardCars";
import Maps from "../../../components/Maps/Maps";
import { CaretLeftIcon } from "@phosphor-icons/react";



export default function CarDetail() {
    const { id } = useParams();
    const { car, isLoading } = useCarDetail(id);
    const { others_cars } = useCarsFiltered(car?.brand || car?.mark);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({});
    const [selectedImg, setSelectedImg] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [formSent, setFormSent] = useState(false);

    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    const getImageSrc = (img) => {
        if (!img) return '';
        if (typeof img === 'string') return img;
        return img.imgUrl || img.img_url || '';
    };

    const formatCurrency = (value) => {
        const numericValue = Number(value);
        if (Number.isNaN(numericValue)) return 'R$ 0,00';
        return numericValue.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    };

    const settingsMobile = {
        infinite: (car?.images?.length || 0) > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    const settingsOthersCars = {
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(others_cars?.length || 1, 4),
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 3 } },
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    useEffect(() => {
        if (!isLoading) {
            setMessage(`Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} continua disponível?`);
        }
    }, [isLoading, car]);

    useEffect(() => { setSelectedImg(0); }, [car]);

    const validation = () => {
        const newErros = {};
        if (!name.trim()) newErros.name = "Nome é obrigatório.";
        if (!email.trim()) newErros.email = "E-mail é obrigatório.";
        else if (!/\S+@\S+\.\S+/.test(email)) newErros.email = "E-mail inválido.";
        if (!message.trim()) newErros.message = "Mensagem é obrigatória.";
        return newErros;
    };

    const sendMessage = (e) => {
        e.preventDefault();
        const errs = validation();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        const mes = `${message} at.te ${name}`;
        window.location.href = `https://api.whatsapp.com/send?phone=5500000000&text=${encodeURIComponent(mes)}`;
    };

    const specItems = car ? [
        { label: "Ano", value: car.year },
        { label: "Quilometragem", value: car.mileage ? `${Number(car.mileage).toLocaleString('pt-br')} km` : "—" },
        { label: "Câmbio", value: car.transmission },
        { label: "Carroceria", value: car.bodywork },
        { label: "Combustível", value: car.fuel },
        { label: "Final de placa", value: car.licensePlateEnd },
        { label: "Cor", value: car.color },
        { label: "Aceita troca", value: car.trade ? "Sim" : "Não" },
        { label: "Blindagem", value: car.armored ? "Sim" : "Não" },
        { label: "Direção", value: car.direction || "Não informado" },
    ] : [];

    const GalleryGrid = () => {
        const imgs = car?.images || [];
        const main = imgs[0];
        const thumbs = imgs.slice(1, 5);
        const remaining = imgs.length - 5;
        const isSingle = thumbs.length === 0;
        return (
            <div className={`cd-gallery-grid${isSingle ? ' cd-gallery-grid--single' : ''}`}>
                <div className="cd-gallery-main" onClick={() => setGalleryOpen(true)}>
                    <img src={getImageSrc(main)} alt={car.model} className="cd-gallery-main-img" />
                    <span className="cd-gallery-count">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                        {imgs.length} fotos
                    </span>
                </div>
                {thumbs.length > 0 && (
                    <div className="cd-gallery-thumbs">
                        {thumbs.map((img, i) => {
                            const isLast = i === thumbs.length - 1 && remaining > 0;
                            return (
                                <button key={i} className={`cd-gallery-thumb ${selectedImg === i + 1 ? 'cd-gallery-thumb--active' : ''}`} onClick={() => { setSelectedImg(i + 1); setGalleryOpen(true); }}>
                                    <img src={getImageSrc(img)} alt={`Vista ${i + 2}`} />
                                    {isLast && remaining > 0 && (
                                        <div className="cd-gallery-more">+{remaining}</div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    };

    const Lightbox = () => (
        <div className="cd-lightbox" onClick={() => setGalleryOpen(false)}>
            <button className="cd-lightbox-close" onClick={() => setGalleryOpen(false)}>✕</button>
            <button className="cd-lightbox-nav cd-lightbox-prev" onClick={e => { e.stopPropagation(); setSelectedImg(p => Math.max(0, p - 1)); }}>‹</button>
            <div className="cd-lightbox-img-wrap" onClick={e => e.stopPropagation()}>
                <img src={getImageSrc(car?.images?.[selectedImg])} alt={car?.model} className="cd-lightbox-img" />
                <span className="cd-lightbox-counter">{selectedImg + 1} / {car?.images?.length}</span>
            </div>
            <button className="cd-lightbox-nav cd-lightbox-next" onClick={e => { e.stopPropagation(); setSelectedImg(p => Math.min((car?.images?.length || 1) - 1, p + 1)); }}>›</button>
            {car?.images?.length > 1 && (
                <div className="cd-lightbox-strip" onClick={e => e.stopPropagation()}>
                    {car.images.map((img, i) => (
                        <button key={i} className={`cd-lightbox-strip-btn ${selectedImg === i ? 'active' : ''}`} onClick={() => setSelectedImg(i)}>
                            <img src={getImageSrc(img)} alt="" />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );

    const Sidebar = () => (
        <aside className="cd-sidebar">
            {/* Preço */}
            <div className="cd-sidebar-price-block">
                <div className="cd-sidebar-badge">{car.carType === "VENDA" ? "À Venda" : "Aluguel"}</div>
                <div className="cd-sidebar-price">{formatCurrency(car?.vehiclePrice)}</div>
                <div className="cd-sidebar-price-label">{car.carType === "VENDA" ? "Valor à vista" : "Valor por dia"}</div>
                {car.trade && <span className="cd-sidebar-trade-tag">✓ Aceita troca</span>}
            </div>

            <div className="cd-sidebar-divider" />

            {/* WhatsApp */}
            <a href={`https://wa.me/5500000000?text=${encodeURIComponent(`Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} ainda está disponível?`)}`} className="cd-whatsapp-btn">
                <img src={IMG} alt="WhatsApp" width="24" height="24" />
                <div>
                    <span>Fale conosco pelo</span>
                    <strong>WhatsApp</strong>
                </div>
            </a>

            {/* Form */}
            <div className="cd-sidebar-form-header">Enviar mensagem ao vendedor</div>
            <div className="cd-sidebar-form">
                <GenericInput label="Nome *" theme="light" exemple="" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                {errors.name && <span className="cd-error">{errors.name}</span>}
                <GenericInput label="Email *" theme="light" exemple="" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
                {errors.email && <span className="cd-error">{errors.email}</span>}
                <GenericInput label="Mensagem *" theme="light" exemple="" type="textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensagem" />
                {errors.message && <span className="cd-error">{errors.message}</span>}
                <span className="cd-required-note">Campos com <span className="cd-red">*</span> são obrigatórios</span>
                <button className="cd-send-btn" onClick={sendMessage}>Enviar Mensagem</button>
            </div>
        </aside>
    );
    const DesktopLayout = () => (
        <div className="cd-page">
            {isLoading ? <GenericLoader /> : (
                <>
                    {galleryOpen && <Lightbox />}

                    <div className="cd-wrapper">
                        <NavLink to="/home" className="cd-back">
                            <CaretLeftIcon size={20} color="#000000" />
                            Voltar para o estoque
                        </NavLink>

                        {/* Título acima da galeria (estilo OLX) */}
                        <div className="cd-page-header">
                            <div>
                                <h1 className="cd-page-title">
                                    {car.brand} <span className="cd-page-title-accent">{car.model?.split(" ")[0]}</span>
                                </h1>
                                <p className="cd-page-subtitle">{car.model} · {car.year} · {car.transmission} · {car.fuel}</p>
                            </div>
                        </div>

                        {/* Hero: galeria + sidebar */}
                        <div className="cd-hero">
                            <div className="cd-main-col">
                                <GalleryGrid />

                                {/* Thumbnails strip */}
                                {car?.images?.length > 1 && (
                                    <div className="cd-thumbs-strip">
                                        {car.images.map((img, i) => (
                                            <button key={i} className={`cd-thumb-btn ${selectedImg === i ? 'cd-thumb-active' : ''}`} onClick={() => setSelectedImg(i)}>
                                                <img src={getImageSrc(img)} alt={`Vista ${i + 1}`} />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Specs com ícones (estilo OLX/Facebook) */}
                                <div className="cd-section cd-section--specs">
                                    <h2 className="cd-section-title">Especificações</h2>
                                    <div className="cd-specs-grid">
                                        {specItems.map((s, i) => (
                                            <div key={i} className="cd-spec-card">

                                                <div>
                                                    <span className="cd-spec-label">{s.label}</span>
                                                    <span className="cd-spec-value">{s.value}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Descrição */}
                                {car.description && (
                                    <div className="cd-section">
                                        <h2 className="cd-section-title">Sobre este veículo</h2>
                                        <p className="cd-description">{car.description}</p>
                                    </div>
                                )}

                                {/* Opcionais (estilo chips OLX) */}
                                {Array.isArray(car?.opcionais) && car.opcionais.length > 0 && (
                                    <div className="cd-section">
                                        <h2 className="cd-section-title">Opcionais do veículo</h2>
                                        <div className="cd-items-grid">
                                            {car.opcionais.map((item, i) => (
                                                <span key={i} className="cd-item-tag">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Sidebar />
                        </div>
                    </div>

                    {/* Outros veículos */}
                    {others_cars?.length > 0 && (
                        <div className="cd-others">
                            <div className="cd-wrapper">
                                <h2 className="cd-section-title">Veículos similares</h2>
                                <Slider {...settingsOthersCars}>
                                    {others_cars.map((c, index) => (
                                        <div key={c.idCar || c.id || index} className="cd-others-card">
                                            <Card
                                                disableSlideImgs={true}
                                                id={c.idCar || c.id_car}
                                                name={c.model}
                                                imgs={c.images || c.imgs}
                                                mark={c.brand || c.mark}
                                                price={c.vehiclePrice || c.price}
                                                bodywork={c.bodywork}
                                                traction={c.traction}
                                                year={c.year}
                                                kilometers={c.mileage || c.kilometers}
                                            />
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}

                    <Maps />
                    <BotaoWhatsApp />
                </>
            )}
        </div>
    );

    /* ────────────────── Mobile layout ────────────────── */
    const MobileLayout = () => (
        isLoading ? <GenericLoader /> : (
            <div className="cd-mobile">
                <NavLink to="/home" className="cd-back cd-back-mobile">
                    <img src={leftArrow} alt="" />
                    Voltar para o estoque
                </NavLink>

                <Slider {...settingsMobile}>
                    {car?.images?.map((img, index) => (
                        <div key={index}>
                            <img src={getImageSrc(img)} alt={`Slide ${index + 1}`} className="cd-mobile-img" />
                        </div>
                    ))}
                </Slider>

                <div className="cd-mobile-content">
                    <span className="cd-badge">{car?.carType === "VENDA" ? "À Venda" : "Aluguel"}</span>
                    <h1 className="cd-title">
                        {car?.brand}{' '}
                        <span className="cd-title-accent">{car?.model?.split(" ")[0]}</span>
                    </h1>
                    <p className="cd-subtitle">{car?.model} · {car?.transmission} · {car?.fuel}</p>

                    <div className="cd-price-block">
                        <span className="cd-price">{formatCurrency(car?.vehiclePrice)}</span>
                        <span className="cd-price-label">{car?.carType === "VENDA" ? "Valor à vista" : "Valor por dia"}</span>
                    </div>

                    {car?.trade && <span className="cd-mobile-trade-tag">✓ Aceita troca</span>}

                    <div className="cd-divider" />

                    <a href={`https://wa.me/5500000000?text=${encodeURIComponent(`Olá, gostaria de saber se o veículo ${car?.model} na cor ${car?.color} ainda está disponível?`)}`} className="cd-whatsapp-btn">
                        <img src={IMG} alt="WhatsApp" width="24" height="24" />
                        <div>
                            <span>Fale conosco pelo</span>
                            <strong>WhatsApp</strong>
                        </div>
                    </a>

                    <div className="cd-mobile-section">
                        <h2 className="cd-section-title">Especificações</h2>
                        <div className="cd-specs-grid cd-specs-mobile">
                            {specItems.map((s, i) => (
                                <div key={i} className="cd-spec-card">

                                    <div>
                                        <span className="cd-spec-label">{s.label}</span>
                                        <span className="cd-spec-value">{s.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {car?.description && (
                        <div className="cd-mobile-section">
                            <h2 className="cd-section-title">Sobre este veículo</h2>
                            <p className="cd-description">{car.description}</p>
                        </div>
                    )}

                    {Array.isArray(car?.opcionais) && car.opcionais.length > 0 && (
                        <div className="cd-mobile-section">
                            <h2 className="cd-section-title">Opcionais do veículo</h2>
                            <div className="cd-items-grid">
                                {car.opcionais.map((item, i) => (
                                    <span key={i} className="cd-item-tag">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="cd-mobile-section">
                        <h2 className="cd-section-title">Fale com o vendedor</h2>
                        <div className="cd-sidebar-form">
                            <GenericInput label="Nome *" theme="light" exemple="" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Seu nome" />
                            {errors.name && <span className="cd-error">{errors.name}</span>}
                            <GenericInput label="Email *" theme="light" exemple="" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" />
                            {errors.email && <span className="cd-error">{errors.email}</span>}
                            <GenericInput label="Mensagem *" theme="light" exemple="" type="textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensagem" />
                            {errors.message && <span className="cd-error">{errors.message}</span>}
                            <button className="cd-send-btn" onClick={sendMessage}>Enviar Mensagem</button>
                        </div>
                    </div>

                    {others_cars?.length > 0 && (
                        <div className="cd-mobile-section">
                            <h2 className="cd-section-title">Veículos similares</h2>
                            <Slider {...settingsOthersCars}>
                                {others_cars.map((c, index) => (
                                    <div key={c.idCar || c.id || index} className="cd-others-card">
                                        <Card
                                            disableSlideImgs={true}
                                            id={c.idCar || c.id_car}
                                            name={c.model}
                                            imgs={c.images || c.imgs}
                                            mark={c.brand || c.mark}
                                            price={c.vehiclePrice || c.price}
                                            bodywork={c.bodywork}
                                            traction={c.traction}
                                            year={c.year}
                                            kilometers={c.mileage || c.kilometers}
                                        />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                </div>
                <BotaoWhatsApp />
            </div>
        )
    );

    return (
        <>
            <Header />
            {isMobile ? <MobileLayout /> : <DesktopLayout />}
            <Footer />
        </>
    );
}