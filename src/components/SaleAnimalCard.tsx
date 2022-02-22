import React, { FC, useEffect, useState } from 'react'
import { IAnimalCard, ISaleAnimalCard } from '../lib/type'
import AnimalCard from './AnimalCard'
import useInputs from '../hooks/useInputs'
import { Box, Button, Flex, Input, InputAddon, InputGroup, Text } from '@chakra-ui/react'
import { saleAnimalTokenContract, web3 } from '../web3Config'

interface SaleAnimalCardProps extends ISaleAnimalCard {
  account: string
  setLoading: (isLoading: boolean) => void
}

const SaleAnimalCard: FC<SaleAnimalCardProps> = ({
  account,
  animalTokenId,
  animalType,
  animalPrice,
  owner,
  setLoading
}) => {
  const [isOwner, setIsOwner] = useState<boolean>(false)
  const checkOwner = () => {
    setIsOwner(account.toLowerCase() === owner.toLowerCase())
  }

  const handleBuy = async () => {
    if (!account) return
    setLoading(true)
    // try {
    //   setLoading(true)
    //   const res = await saleAnimalTokenContract.methods.saleForAnimalToken(animalTokenId, web3.utils.toWei(String(price), 'ether')).send({ from: account })
    //   if (!res.status) return
    //   // 바로 price를 써주면 형변환 에러가 나므로 toWei메소드 사용
    //   setMyAnimalPrice(web3.utils.toWei(String(price), 'ether'))
    // } catch (error) {
    //   console.error(error)
    // }
    setLoading(false)
  }

  useEffect(() => {
    if (!account) return
    checkOwner()
  }, [account])

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

