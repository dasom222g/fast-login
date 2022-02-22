import React, { FC, useEffect, useState } from 'react'
import { IAnimalCard, ISaleAnimalCard } from '../lib/type'
import AnimalCard from './AnimalCard'
import useInputs from '../hooks/useInputs'
import { Box, Button, Flex, Input, InputAddon, InputGroup, Text } from '@chakra-ui/react'
import { saleAnimalTokenContract, web3 } from '../web3Config'

interface SaleAnimalCardProps extends ISaleAnimalCard {
  account: string
  setLoading: (isLoading: boolean) => void
  hanldelSoldAnimalCard: (soldAnimalCard: ISaleAnimalCard) => void
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  account,
  animalTokenId,
  animalType,
  animalPrice,
  owner,
  setLoading,
  hanldelSoldAnimalCard
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const checkOwner = () => {
    setIsOwner(account.toLowerCase() === owner.toLowerCase())
  }

  const handleBuy = async () => {
    if (!account) return
    setLoading(true)
    try {
      // payable함수를 호출할 경우 from, value(지불 금액)를 모두 보내야함
      const res = await saleAnimalTokenContract.methods.purchaseAnimalToken(animalTokenId).send({ from: account, value: animalPrice })
      if (!res.status) return
      const soldAnimalCard: ISaleAnimalCard = {
        animalTokenId,
        animalType,
        animalPrice,
        owner
      }
      hanldelSoldAnimalCard(soldAnimalCard)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (!account) return
    checkOwner()
  }, [account, animalTokenId])

  // view
  return (
    <Box w={150} textAlign="center">
      <AnimalCard animalType={animalType} />
      <Flex mt={2} alignItems="center" justifyContent="center">
        <Text fontSize="sm">{`${web3.utils.fromWei(animalPrice)}Matic`} </Text>
        <Button colorScheme="blue" size="sm" ml={2} disabled={isOwner} onClick={handleBuy}>Buy</Button>
      </Flex>
    </Box>
  )
}

export default SaleAnimalCard

