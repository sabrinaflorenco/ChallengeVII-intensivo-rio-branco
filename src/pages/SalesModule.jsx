import React, { useState } from "react";
import Header from "../components/Header";

const ProductsPage = () => {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    tipoCurso: "online",
    nome: "",
    email: "",
    telefone: "",
    valorBruto: "",
    descontos: "",
    impostos: "",
    valorFinal: "",
  });
  const fields = [ // Array de objetos para os campos do formulário
    {
      label: "Tipo de Curso",
      type: "text",
      name: "tipoCurso",
      placeholder: "Tipo de Curso",
      value: formData.tipoCurso,
    },
    {
      label: "Nome",
      type: "text",
      name: "nome",
      placeholder: "Nome",
      value: formData.nome,
    },
    {
      label: "Email",
      type: "email",
      name: "email",
      placeholder: "Email",
      value: formData.email,
    },
    {
      label: "Telefone",
      type: "tel",
      name: "telefone",
      placeholder: "Telefone",
      value: formData.telefone,
    },
    {
      label: "Valor Bruto",
      type: "number",
      name: "valorBruto",
      placeholder: "Valor Bruto",
      value: formData.valorBruto,
    },
    {
      label: "Descontos",
      type: "number",
      name: "descontos",
      placeholder: "Descontos",
      value: formData.descontos,
    },
    {
      label: "Impostos",
      type: "number",
      name: "impostos",
      placeholder: "Impostos",
      value: formData.impostos,
    },
    {
      label: "Valor Final",
      type: "number",
      name: "valorFinal",
    },
  ];

  const [filtro, setFiltro] = useState({ tipoCurso: "", periodo: "" });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };
  // Não precisa dessse handleChange, pois o valor do select já está sendo controlado pelo estado formData

  const handleSubmit = (e) => {
    e.preventDefault();
    setSales((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      tipoCurso: "online",
      nome: "",
      email: "",
      telefone: "",
      valorBruto: "",
      descontos: "",
      impostos: "",
      valorFinal: "",
    });
  };

  const filteredSales = sales.filter((sale) => {
    return !filtro.tipoCurso || sale.tipoCurso === filtro.tipoCurso;
  });

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Módulo de Vendas" />

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Cadastro de Venda</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {fields.map((field, index) => ( // Mapeando os campos do formulário
            <div key={index}>
              <label>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={field.value}
                onChange={(e) =>
                  setFormData({ ...formData, [field.name] : e.target.value }) //utilizando o valor do campo para atualizar o estado
                }
                className="w-full border p-2 rounded"
              />
            </div>
          ))}

          <div className="col-span-2 text-right">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Cadastrar Venda
            </button>
          </div>
        </form>
        /* Filtros */
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Lista de Vendas</h2>
          <div className="flex gap-4 mb-4">
            <select
              value={filtro.tipoCurso}
              onChange={(e) =>
                setFiltro((f) => ({ ...f, tipoCurso: e.target.value }))
              }
              className="border p-2 rounded"
            >
              <option value="">Todos os Tipos</option>
              <option value="online">Online</option>
              <option value="presencial">Presencial</option>
            </select>
            /* Filtro por período pode ser adicionado aqui */
          </div>
          /* Tabela de vendas */
          <table className="w-full border text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Cliente</th>
                <th className="p-2 border">Tipo</th>
                <th className="p-2 border">Valor Final</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id}>
                  <td className="p-2 border">{sale.nome}</td>
                  <td className="p-2 border">{sale.tipoCurso}</td>
                  <td className="p-2 border">R$ {sale.valorFinal}</td>
                </tr>
              ))}
              {filteredSales.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center p-4">
                    Nenhuma venda cadastrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
