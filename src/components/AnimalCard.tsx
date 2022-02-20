import React, { FC } from 'react'
import { Image } from '@chakra-ui/react'

interface AnimalCardProps {
  animalType: string
}

const AnimalCard: FC<AnimalCardProps> = ({ animalType }) => {
  return <Image w={200} h={200} borderRadius={10} src={`images/${animalType}.png`} alt="Animal Card" />
}

export default AnimalCard
