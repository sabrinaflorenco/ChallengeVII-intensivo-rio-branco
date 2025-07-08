import { useEffect, useState } from 'react'
import Header from '../components/Header'

export default function Expenses() {
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [expen, setExpen] = useState([])

  useEffect(() => {
    const stored = localStorage.getItem('expenses')
    if (stored) {
      setExpen(JSON.parse(stored))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expen))
  }, [expen])

  return (
    <div className='flex-1'>
      <Header title='Despesas' />
      <div className='flex justify-center h-full max-sm:max-w-76 mt-40'>
        {/* bg-red-500 */}
        <div className=' max-h-[700px] w-[800px]'>
          <form action='' className=''>
            {/* adicionar gasto */}
            {/* ------------------------------------------------------ */}
            <div className='flex gap-8 justify-center w-full max-sm:flex-col max-sm:items-center '>
              <input
                type='text'
                placeholder='Descrição do gasto'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className='shadow-2xs shadow-black rounded-full text-center w-70 max-sm:h-12'
              />
              <input
                type='number'
                placeholder='Valor do gasto'
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className='shadow-2xs shadow-black rounded-full text-center w-70 max-sm:h-12'
              />
              <button
                type='submit'
                className='bg-blue-500 text-white rounded-full p-3 cursor-pointer'
                onClick={(e) => {
                  e.preventDefault()
                  setExpen([...expen, { description, value }])
                  setDescription('')
                  setValue('')
                }}
              >
                Adicionar
              </button>
            </div>
            {/* ------------------------------------------------------ */}
            {/* lista de gastos */}
            {/* ------------------------------------------------------ */}
            {expen.map((item, index) => (
              <div key={index} className='grid grid-cols-3 gap-4 mt-10 '>
                <div className='flex items-center justify-center '>
                  <p className='font-bold uppercase max-w-[800px]  '>
                    {item.description}
                  </p>
                </div>
                <div className='flex items-center justify-center'>
                  <p className='font-bold uppercase max-w-[800px] text-center'>
                    R$ {item.value}
                  </p>
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    className='bg-red-500 rounded-full p-3 text-white font-bold cursor-pointer'
                    onClick={() => {
                      setExpen(expen.filter((_, i) => i !== index))
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            ))}

            {/* ------------------------------------------------------ */}
            <div className='flex items-center justify-center mt-10'>
              <h1 className='text-2xl font-bold'>
                Total: R${' '}
                {expen.reduce((acc, curr) => acc + Number(curr.value), 0)}
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
