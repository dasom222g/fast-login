import React, { FC, useEffect, useState } from 'react'
import { IAnimalCard } from '../lib/typs'
import AnimalCard from './AnimalCard'
import useInputs from '../hooks/useInputs'
import { Box, Button, Input, InputAddon, InputGroup, Text } from '@chakra-ui/react'
import { saleAnimalTokenContract, web3 } from '../web3Config'

interface MyAnimalCardProps extends IAnimalCard {
  account: string
  isSaleStatus: boolean
  setLoading: (isLoading: boolean) => void
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  account,
  isSaleStatus,
  animalTokenId,
  animalType,
  animalPrice,
  setLoading
}) => {
  const initial = { price: 0 }
  const [form, onChange] = useInputs(initial)
  const { price } = form

  const [myAnimalPrice, setMyAnimalPrice] = useState<number>(animalPrice)

  const handleSell = async () => {
    if (!account || !isSaleStatus) return
    try {
      setLoading(true)
      console.log('price', price)
      const res = await saleAnimalTokenContract.methods.SaleForAnimalToken(animalTokenId, web3.utils.toWei(String(price), 'ether')).send({ from: account })
      if (!res.status) return
      const resultPrice: string = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenPrice(animalTokenId).call()
      setMyAnimalPrice(Number(web3.utils.fromWei(resultPrice)))
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    console.log('myAnimalPrice22', myAnimalPrice)
  }, [myAnimalPrice])

  // view
  return (
    <Box w={150} textAlign="center">
      <AnimalCard animalType={animalType} />
      <Box>
        {myAnimalPrice === 0 ? (
          <>
            <InputGroup size="sm">
              <Input type="number" name="price" value={price} onChange={onChange} />
              <InputAddon children="Matic" />
            </InputGroup>
            <Button colorScheme="blue" mt={2} onClick={handleSell}>Sell</Button>
          </>
        ) : (
          `${myAnimalPrice} Matic`
        )}
      </Box>
    </Box>
  )
}

export default MyAnimalCard

