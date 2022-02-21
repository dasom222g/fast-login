import React, { FC } from 'react'

interface SaleAnimalProps {
  account: string
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  return (
    <div>SaleAnimal</div>
  )
}

export default SaleAnimal