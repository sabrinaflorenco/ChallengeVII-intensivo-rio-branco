import React, { useState, useEffect } from "react";
import Header from "../components/Header";


const SalesModule= () => {
  
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    tipoCurso: "online",
    nome: "",
    email: "",
    telefone: "",
    valorBruto: "",
    descontos: "",
    impostos: "",
    comissoes:"",
    taxasCartao:"",
    valorFinal: "",
    dataVenda: new Date().toISOString().split('T')[0],
  });
   const [filtro, setFiltro] = useState({ 
    tipoCurso: "", 
    dataInicio: "", 
    dataFim: "" 
  });

  const [errors, setErrors] = useState({});

  // Cálculo automático do valor final
  useEffect(() => {
    const valorBruto = parseFloat(formData.valorBruto) || 0;
    const descontos = parseFloat(formData.descontos) || 0;
    const impostos = parseFloat(formData.impostos) || 0;
    const comissoes = parseFloat(formData.comissoes) || 0;
    const taxasCartao = parseFloat(formData.taxasCartao) || 0;
    
    const valorFinal = valorBruto - descontos - impostos - comissoes - taxasCartao;
    
    setFormData(prev => ({
      ...prev,
      valorFinal: valorFinal.toFixed(2)
    }));
  }, [formData.valorBruto, formData.descontos, formData.impostos, formData.comissoes, formData.taxasCartao]);

  const fields = [ // Array de objetos para os campos do formulário
    {
      label: "Tipo de Curso *",
      type: "select",
      name: "tipoCurso",
      placeholder: "Tipo de Curso",
      options:[
        {value: "online", label: "Online"},
        {value: "presencial", label: "Presencial"}
      ],
      value: formData.tipoCurso,
      required: true,
    },
    {
      label: "Nome do Cliente *",
      type: "text",
      name: "nome",
      placeholder: "Nome completo do cliente",
      value: formData.nome,
      required:true,
    },
    {
      label: "Email *",
      type: "email",
      name: "email",
      placeholder: "email@exemplo.com",
      value: formData.email,
      required: true,
    },
    {
      label: "Telefone *",
      type: "tel",
      name: "telefone",
      placeholder: "(xx)9xxxxxxxx",
      value: formData.telefone,
      required: true,
    },
     {
      label: "Data da Venda *",
      type: "date",
      name: "dataVenda",
      value: formData.dataVenda,
      requered: true,
    },
    {
      label: "Valor Bruto (R$) *",
      type: "number",
      name: "valorBruto",
      placeholder: "0,00",
      value: formData.valorBruto,
      required: true,
      step: "0.01",
      min: "0",
    },
     {
      label: "Comissões (R$)",
      type: "number",
      name: "comissoes",
      placeholder: "0,00",
      value: formData.comissoes,
      step: "0.01",

    },

    {
      label: "Descontos (R$)",
      type: "number",
      name: "descontos",
      placeholder: "0,00",
      value: formData.descontos,
      step:"0.01",
     
    },
    {
      label: "Impostos (R$)",
      type: "number",
      name: "impostos",
      placeholder: "0,00",
      value: formData.impostos,
      step:"0.01",
      
    },
   
    {
      label: "Taxas de Cartão (R$)",
      type: "number",
      name: "taxasCartao",
      placeholder: "0,00",
      value: formData.taxasCartao,
      step:"0.01"
      
    },

  ];
   // Validação do formulário
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!formData.email.trim()) newErrors.email = "Email é obrigatório";
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório";
    if (!formData.valorBruto || parseFloat(formData.valorBruto) <= 0) {
      newErrors.valorBruto = "Valor bruto deve ser maior que zero";
    }
    if (!formData.dataVenda) newErrors.dataVenda = "Data da venda é obrigatória";
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    
    // Validação de telefone
    const phoneRegex = /^\(\d{2}\)\d{8,9}$/;
    if (formData.telefone && !phoneRegex.test(formData.telefone)) {
      newErrors.telefone = "Formato: (xx)xxxxxxxxx";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    const newSale = {
      ...formData,
      id: Date.now(),
      valorBruto: parseFloat(formData.valorBruto),
      descontos: parseFloat(formData.descontos) || 0,
      impostos: parseFloat(formData.impostos) || 0,
      comissoes: parseFloat(formData.comissoes) || 0,
      taxasCartao: parseFloat(formData.taxasCartao) || 0,
      valorFinal: parseFloat(formData.valorFinal),
    };
    
    setSales((prev) => [...prev, newSale]);
    
    // Reset form
    setFormData({
      tipoCurso: "online",
      nome: "",
      email: "",
      telefone: "",
      valorBruto: "",
      descontos: "",
      impostos: "",
      comissoes: "",
      taxasCartao: "",
      valorFinal: "",
      dataVenda: new Date().toISOString().split('T')[0],
    });
    
    setErrors({});
    alert("Venda cadastrada com sucesso!");
  };

  // Filtrar vendas
  const filteredSales = sales.filter((sale) => {
    const matchTipo = !filtro.tipoCurso || sale.tipoCurso === filtro.tipoCurso;
    const matchDataInicio = !filtro.dataInicio || sale.dataVenda >= filtro.dataInicio;
    const matchDataFim = !filtro.dataFim || sale.dataVenda <= filtro.dataFim;
    
    return matchTipo && matchDataInicio && matchDataFim;
  });

  // Calcular totais
  const totalVendas = filteredSales.reduce((total, sale) => total + sale.valorFinal, 0);
  const totalDescontos = filteredSales.reduce((total, sale) => total + sale.descontos, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };
 
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Módulo de Vendas" />

      <div className="p-4 sm:p-6">
        <h2 className="text-xl font-semibold mb-4">Cadastro de Venda</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {fields.map((field, index) => (
            <div key={index} className="w-full">
              <label className="block mb-1">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={field.value}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  className={`w-full border p-2 rounded ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                  required={field.required}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={field.value}
                  onChange={(e) =>
                    setFormData({ ...formData, [field.name]: e.target.value })
                  }
                  placeholder={field.placeholder}
                  className={`w-full border p-2 rounded ${
                    errors[field.name] ? "border-red-500" : "border-gray-300"
                  }`}
                  required={field.required}
                  step={field.step}
                  min={field.min}
                />
              )}
              {errors[field.name] && (
                <span className="text-red-500 text-sm">{errors[field.name]}</span>
              )}
            </div>
          ))}

          <div className="w-full">
            <label className="block text-sm font-medium mb-1">
              Valor Final (R$)
            </label>
            <input
              type="number"
              value={formData.valorFinal}
              className="w-full border p-2 rounded "
              readOnly
            />
          </div>

          <div className="col-span-1 sm:col-span-2 text-right mt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Cadastrar Venda
            </button>
          </div>
        </form>

        {/* Filtros */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Lista de Vendas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">
                Tipo de Curso
              </label>
              <select
                value={filtro.tipoCurso}
                onChange={(e) =>
                  setFiltro((f) => ({ ...f, tipoCurso: e.target.value }))
                }
                className="border p-2 rounded w-full bg-gray-700 text-white"
              >
                <option value="">Todos os Tipos</option>
                <option value="online">Online</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Data Início
              </label>
              <input
                type="date"
                value={filtro.dataInicio}
                onChange={(e) =>
                  setFiltro((f) => ({ ...f, dataInicio: e.target.value }))
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Data Fim
              </label>
              <input
                type="date"
                value={filtro.dataFim}
                onChange={(e) =>
                  setFiltro((f) => ({ ...f, dataFim: e.target.value }))
                }
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={() =>
                  setFiltro({ tipoCurso: "", dataInicio: "", dataFim: "" })
                }
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors w-full"
              >
                Limpar Filtros
              </button>
            </div>
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-800">Total de Vendas</h3>
              <p className="text-2xl font-bold text-blue-600">
                {filteredSales.length}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Valor Total</h3>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalVendas)}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">Total Descontos</h3>
              <p className="text-2xl font-bold text-orange-600">
                {formatCurrency(totalDescontos)}
              </p>
            </div>
          </div>

          {/* Tabela responsiva */}
          <div className="overflow-x-auto">
            <table className="min-w-full border text-left">
              <thead>
                <tr className=" ">
                  <th className="p-2 border">Data Venda</th>
                  <th className="p-2 border">Cliente</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Telefone</th>
                  <th className="p-2 border">Tipo</th>
                  <th className="p-2 border">Valor Bruto</th>
                  <th className="p-2 border">Desconto</th>
                  <th className="p-2 border">Valor Final</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale) => (
                  <tr key={sale.id} className="">
                    <td className="p-2 border">{formatDate(sale.dataVenda)}</td>
                    <td className="p-2 border">{sale.nome}</td>
                    <td className="p-2 border">{sale.email}</td>
                    <td className="p-2 border">{sale.telefone}</td>
                    <td className="p-2 border">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          sale.tipoCurso === "online"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {sale.tipoCurso}
                      </span>
                    </td>
                    <td className="p-2 border">
                      {formatCurrency(sale.valorBruto)}
                    </td>
                    <td className="p-2 border">
                      {formatCurrency(sale.descontos)}
                    </td>
                    <td className="p-2 border font-semibold">
                      {formatCurrency(sale.valorFinal)}
                    </td>
                  </tr>
                ))}
                {filteredSales.length === 0 && (
                  <tr>
                    <td colSpan="8" className="text-center p-8 text-gray-500">
                      Nenhuma venda cadastrada.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesModule;