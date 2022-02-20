import React, { FC } from 'react'
import { IAnimalCard } from '../lib/typs'
import AnimalCard from './AnimalCard'
import { Box, Text } from '@chakra-ui/react'

interface MyAnimalCardProps extends IAnimalCard {
  account: string
  isSaleStatus: boolean
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({ account, isSaleStatus, animalTokenId, animalType, animalPrice }) => {
  return (
    <Box w="150" textAlign="center">
      <AnimalCard animalType={animalType} />
      <Text>{animalPrice === 0 ? '판매 버튼' : `${animalPrice} Matic`}</Text>
    </Box>
  )
}

export default MyAnimalCard