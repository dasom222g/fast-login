import React, { FC, useEffect } from 'react'
import { saleAnimalTokenContract } from '../web3Config'

interface SaleAnimalProps {
  account: string
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  const getOnSaleAnimalToken = async () => {
    try {
      const saleAnimalTokenLength: string = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenLength().call()
      console.log('saleAnimalTokenLength', saleAnimalTokenLength)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    account && getOnSaleAnimalToken()
  }, [account])
  // view
  return (
    <div>SaleAnimal</div>
  )
}

export default SaleAnimal