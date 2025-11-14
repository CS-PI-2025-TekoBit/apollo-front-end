import React, { useState, useRef, useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import './styles.css';
import Api from '../../../../api/api';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const ModalOperacao = ({ visible, tipoOperacao = 0, onHide, onConfirm, id_car, operacaoInicial = null }) => {
    const queryClient = useQueryClient();
    const modoEdicao = operacaoInicial !== null;
    const [nomeClienteVenda, setNomeClienteVenda] = useState('');
    const [precoVenda, setPrecoVenda] = useState('');
    const [imagemDocumentoVenda, setImagemDocumentoVenda] = useState(null);

    const [nomeClienteAluguel, setNomeClienteAluguel] = useState('');
    const [precoAluguel, setPrecoAluguel] = useState('');
    const [dataAluguel, setDataAluguel] = useState('');
    const [dataDevolucao, setDataDevolucao] = useState('');
    const [imagemDocumentoAluguel, setImagemDocumentoAluguel] = useState(null);

    const fileInputVendaRef = useRef(null);
    const fileInputAluguelRef = useRef(null);

    useEffect(() => {
        if (operacaoInicial && visible) {
            if (tipoOperacao === 0) {
                setNomeClienteVenda(operacaoInicial.nomeCliente || '');
                const valorFormatado = operacaoInicial.valor?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }) || '';
                setPrecoVenda(valorFormatado);
            } else if (tipoOperacao === 1) {
                setNomeClienteAluguel(operacaoInicial.nomeCliente || '');
                const valorFormatado = operacaoInicial.valor?.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }) || '';
                setPrecoAluguel(valorFormatado);

                if (operacaoInicial.dataOperacao) {
                    const dataOp = new Date(operacaoInicial.dataOperacao);
                    const dataFormatada = dataOp.toISOString().split('T')[0];
                    setDataAluguel(dataFormatada);
                }

                if (operacaoInicial.dataDevolucao) {
                    const dataDev = new Date(operacaoInicial.dataDevolucao);
                    const dataFormatada = dataDev.toISOString().split('T')[0];
                    setDataDevolucao(dataFormatada);
                }
            }
        }
    }, [operacaoInicial, visible, tipoOperacao]);

    const formatarMoeda = (valor) => {
        const apenasNumeros = valor.replace(/\D/g, '');

        const numero = parseFloat(apenasNumeros) / 100;

        return numero.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const converterParaISO8601 = (dataString) => {
        if (!dataString) return null;

        const [ano, mes, dia] = dataString.split('-');
        const data = new Date(ano, mes - 1, dia, 14, 30, 0);

        return data.toISOString();
    };

    const handlePrecoVendaChange = (e) => {
        const valorFormatado = formatarMoeda(e.target.value);
        setPrecoVenda(valorFormatado);
    };

    const handlePrecoAluguelChange = (e) => {
        const valorFormatado = formatarMoeda(e.target.value);
        setPrecoAluguel(valorFormatado);
    };

    const limparCampos = () => {
        setNomeClienteVenda('');
        setPrecoVenda('');
        setImagemDocumentoVenda(null);

        setNomeClienteAluguel('');
        setPrecoAluguel('');
        setDataAluguel('');
        setDataDevolucao('');
        setImagemDocumentoAluguel(null);

        if (fileInputVendaRef.current) fileInputVendaRef.current.value = '';
        if (fileInputAluguelRef.current) fileInputAluguelRef.current.value = '';
    };

    const handleCancelar = () => {
        limparCampos();
        if (onHide) onHide();
    };

    const handleConfirmar = async () => {
        if (tipoOperacao === 0) {
            if (!nomeClienteVenda.trim()) {
                toast.error('Por favor, preencha o nome do cliente');
                return;
            }
        } else if (tipoOperacao === 1) {
            if (!nomeClienteAluguel.trim()) {
                toast.error('Por favor, preencha o nome do cliente');
                return;
            }

            if (dataAluguel && dataDevolucao) {
                const dataInicio = new Date(dataAluguel);
                const dataFim = new Date(dataDevolucao);

                if (dataFim <= dataInicio) {
                    toast.error('A data de devolução deve ser maior que a data de aluguel');
                    return;
                }
            }
        }

        await enviarDados();
    };

    const enviarDados = async () => {
        try {
            const data = tipoOperacao === 0 ? {
                nomeCliente: nomeClienteVenda,
                valor: parseFloat(precoVenda.replace(/\./g, '').replace(',', '.')),
                dataOperacao: new Date().toISOString(),
                tipoOperacao: 0,
            } : {
                nomeCliente: nomeClienteAluguel,
                valor: parseFloat(precoAluguel.replace(/\./g, '').replace(',', '.')),
                dataOperacao: converterParaISO8601(dataAluguel),
                dataDevolucao: converterParaISO8601(dataDevolucao),
                tipoOperacao: 1,
            };

            let result;

            if (modoEdicao) {
                result = await Api.put(`cars/operations/${operacaoInicial.id}`, { ...data, id_car });

                if (result.status === 200) {
                    toast.success('Operação atualizada com sucesso!');
                } else {
                    toast.error('Erro ao atualizar operação.');
                }
            } else {
                result = await Api.post(`/cars/${id_car}/operation`, data);

                if (result.status === 201) {
                    toast.success('Operação realizada com sucesso!');
                } else {
                    toast.error('Erro ao realizar operação.');
                }
            }

        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
            toast.error(modoEdicao ? 'Erro ao atualizar operação.' : 'Erro ao realizar operação.');
        }
        finally {
            limparCampos();
            queryClient.invalidateQueries('all_cars_filtered');
            if (onHide) onHide();
        }
    }


    const handleImagemVendaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemDocumentoVenda(file);
        }
    };

    const handleImagemAluguelChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagemDocumentoAluguel(file);
        }
    };

    const getTitulo = () => {
        const prefixo = modoEdicao ? 'Editar' : 'Cadastrar';
        if (tipoOperacao === 0) return `${prefixo} venda de carro`;
        if (tipoOperacao === 1) return `${prefixo} aluguel de carro`;
        return 'Operação';
    };

    const footer = (
        <div className="modal-footer">
            <Button
                label="Limpar Campos"
                icon="pi pi-trash"
                onClick={limparCampos}
                className="p-button-warning p-button-outlined"
            />
            <Button
                label="Cancelar"
                icon="pi pi-times"
                onClick={handleCancelar}
                className="p-button-danger p-button-outlined"
            />
            <Button
                label="Confirmar"
                icon="pi pi-check"
                onClick={handleConfirmar}
                className="p-button-success"
                tooltip={modoEdicao ? "Salvar alterações" : "Cadastrar operação"}
            />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            modal
            closable={true}
            onHide={handleCancelar}
            header={getTitulo()}
            style={{ width: '500px', backgroundColor: '#000000' }}
            footer={footer}
            className="modal-operacao"
        >
            <div className="modal-content">
                {/* Modal de Venda (tipoOperacao = 0) */}
                {tipoOperacao === 0 && (
                    <>
                        <div className="field">
                            <label htmlFor="nomeClienteVenda">
                                Nome do cliente <span className="required">*</span>
                            </label>
                            <InputText
                                id="nomeClienteVenda"
                                value={nomeClienteVenda}
                                onChange={(e) => setNomeClienteVenda(e.target.value)}
                                placeholder="Digite o nome do cliente"
                                className="w-full"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="precoVenda">Preço de venda</label>
                            <InputText
                                id="precoVenda"
                                value={precoVenda}
                                onChange={handlePrecoVendaChange}
                                placeholder="0,00"
                                className="w-full"
                                keyfilter="money"
                            />
                            {precoVenda && (
                                <small className="price-display">R$ {precoVenda}</small>
                            )}
                        </div>

                        <div className="field">
                            <label>Imagem de documento</label>
                            <div
                                className="upload-area"
                                onClick={() => fileInputVendaRef.current?.click()}
                            >
                                <input
                                    ref={fileInputVendaRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImagemVendaChange}
                                    style={{ display: 'none' }}
                                />
                                <div className="upload-content">
                                    <i className="pi pi-cloud-upload" style={{ fontSize: '2rem' }}></i>
                                    <p>
                                        {imagemDocumentoVenda
                                            ? imagemDocumentoVenda.name
                                            : 'Arraste e solte as imagens aqui'}
                                    </p>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>OU</p>
                                    <p style={{ fontSize: '0.875rem', color: '#3b82f6', cursor: 'pointer' }}>
                                        Clique para buscar a imagem
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="required-notice">
                            Os campos marcados com <span className="required">*</span> são obrigatórios
                        </p>
                    </>
                )}

                {/* Modal de Aluguel (tipoOperacao = 1) */}
                {tipoOperacao === 1 && (
                    <>
                        <div className="field">
                            <label htmlFor="nomeClienteAluguel">
                                Nome do cliente <span className="required">*</span>
                            </label>
                            <InputText
                                id="nomeClienteAluguel"
                                value={nomeClienteAluguel}
                                onChange={(e) => setNomeClienteAluguel(e.target.value)}
                                placeholder="Digite o nome do cliente"
                                className="w-full"
                            />
                        </div>

                        <div className="field-row">
                            <div className="field">
                                <label htmlFor="precoAluguel">Preço de aluguel</label>
                                <InputText
                                    id="precoAluguel"
                                    value={precoAluguel}
                                    onChange={handlePrecoAluguelChange}
                                    placeholder="0,00"
                                    keyfilter="money"
                                />
                                {precoAluguel && (
                                    <small className="price-display">R$ {precoAluguel}</small>
                                )}
                            </div>

                            <div className="field">
                                <label htmlFor="dataAluguel">Data do aluguel</label>
                                <InputText
                                    id="dataAluguel"
                                    type="date"
                                    value={dataAluguel}
                                    onChange={(e) => setDataAluguel(e.target.value)}
                                />
                            </div>

                            <div className="field">
                                <label htmlFor="dataDevolucao">Data da devolução</label>
                                <InputText
                                    id="dataDevolucao"
                                    type="date"
                                    value={dataDevolucao}
                                    onChange={(e) => setDataDevolucao(e.target.value)}
                                    min={dataAluguel || undefined}
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label>Imagem de documento</label>
                            <div
                                className="upload-area"
                                onClick={() => fileInputAluguelRef.current?.click()}
                            >
                                <input
                                    ref={fileInputAluguelRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImagemAluguelChange}
                                    style={{ display: 'none' }}
                                />
                                <div className="upload-content">
                                    <i className="pi pi-cloud-upload" style={{ fontSize: '2rem' }}></i>
                                    <p>
                                        {imagemDocumentoAluguel
                                            ? imagemDocumentoAluguel.name
                                            : 'Arraste e solte as imagens aqui'}
                                    </p>
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>OU</p>
                                    <p style={{ fontSize: '0.875rem', color: '#3b82f6', cursor: 'pointer' }}>
                                        Clique para buscar a imagem
                                    </p>
                                </div>
                            </div>
                        </div>

                        <p className="required-notice">
                            Os campos marcados com <span className="required">*</span> são obrigatórios
                        </p>
                    </>
                )}
            </div>
        </Dialog>
    );
};

export default ModalOperacao;