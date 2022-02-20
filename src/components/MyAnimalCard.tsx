import React, { FC } from 'react'
import { IAnimalCard } from '../lib/typs'
import AnimalCard from './AnimalCard'
import useInputs from '../hooks/useInputs'
import { Box, Button, Input, InputAddon, InputGroup, Text } from '@chakra-ui/react'

interface MyAnimalCardProps extends IAnimalCard {
  account: string
  isSaleStatus: boolean
}

const MyAnimalCard: FC<MyAnimalCardProps> = ({
  account,
  isSaleStatus,
  animalTokenId,
  animalType,
  animalPrice,
}) => {
  const initial = { price: 0 }
  const [form, onChange] = useInputs(initial)
  const { price } = form

  const handleSell = () => {
    console.log('price', price)
  }

  return (
    <Box w={150} textAlign="center">
      <AnimalCard animalType={animalType} />
      <Box>
        {animalPrice === 0 ? (
          <>
            <InputGroup size="sm">
              <Input type="number" name="price" value={price} onChange={onChange} />
              <InputAddon children="Matic" />
            </InputGroup>
            <Button colorScheme="blue" mt={2} onClick={handleSell}>Sell</Button>
          </>
        ) : (
          `${animalPrice} Matic`
        )}
      </Box>
    </Box>
  )
}

export default MyAnimalCard

