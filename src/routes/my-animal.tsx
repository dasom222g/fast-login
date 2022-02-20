import { Grid, Spinner } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import AnimalCard from '../components/AnimalCard'
import { mintAnimalTokenContract } from '../web3Config'

interface MyAnimalProps {
  account: string
}
const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCards, setAnimalCards] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const getAnimalCards = async () => {
    setIsLoading(true)
    try {
      const mintCount: string = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call()
      let animalTypes: string[] = []
      for (let i = 0; i < Number(mintCount); i++) {
        const tokenId: string = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call()
        const animalType: string = await mintAnimalTokenContract.methods
          .animalTypeMap(tokenId)
          .call()
        animalTypes = [...animalTypes, animalType]
      }
      setAnimalCards(animalTypes)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
    console.log('loading끝??')
  }

  useEffect(() => {
    if (!account) return
    getAnimalCards()
  }, [account])

  useEffect(() => {
    console.log('animalCards', animalCards)
  }, [animalCards])

  // view
  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} h="full">
        {animalCards.map((item, index) => <AnimalCard key={index} animalType={item} />)}
      </Grid>
    </>
  )
}

export default MyAnimal
