import React, { FC, useEffect, useState } from 'react'
import { IAnimalCard } from '../lib/type'
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

  const [myAnimalPrice, setMyAnimalPrice] = useState<string>(animalPrice)

  const handleSell = async () => {
    if (!account || !isSaleStatus) return
    try {
      setLoading(true)
      const res = await saleAnimalTokenContract.methods.saleForAnimalToken(animalTokenId, web3.utils.toWei(String(price), 'ether')).send({ from: account })
      if (!res.status) return
      // 바로 price를 써주면 형변환 에러가 나므로 toWei메소드 사용
      setMyAnimalPrice(web3.utils.toWei(String(price), 'ether'))
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  // view
  return (
    <Box w={150} textAlign="center">
      <AnimalCard animalType={animalType} />
      <Box mt={2}>
        {Number(myAnimalPrice) === 0 ? (
          <Box textAlign="left">
            <InputGroup size="sm">
              <Input type="number" name="price" value={price} onChange={onChange} />
              <InputAddon children="Matic" />
            </InputGroup>
            <Button colorScheme="blue" size="sm" mt={2} onClick={handleSell} disabled={!isSaleStatus}>Sell</Button>
          </Box>
        ) : (
          `${web3.utils.fromWei(myAnimalPrice)} Matic`
        )}
      </Box>
    </Box>
  )
}

export default MyAnimalCard

