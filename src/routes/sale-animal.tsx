import { Flex, Grid, Spinner } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import { ISaleAnimalCard } from '../lib/type'
import { saleAnimalTokenContract } from '../web3Config'
import SaleAnimalCard from '../components/SaleAnimalCard'

interface SaleAnimalProps {
  account: string
}

const SaleAnimal: FC<SaleAnimalProps> = ({ account }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [onSaleAnimalCards, setOnSaleAnimalCards] = useState<ISaleAnimalCard[]>(
    []
  )

  const setLoading = (isLoading: boolean) => {
    setIsLoading(isLoading)
  }

  const getOnSaleAnimalToken = async () => {
    if (!account) return
    setIsLoading(true)
    try {
      // const onSaleAnimalTokenLength: string = await saleAnimalTokenContract.methods.getOnSaleAnimalTokenLength().call()
      const onSaleAnimalTokenList: ISaleAnimalCard[] =
        await saleAnimalTokenContract.methods.getOnSaleAnimalTokenList().call()
      onSaleAnimalTokenList.length &&
        setOnSaleAnimalCards(onSaleAnimalTokenList)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    account && getOnSaleAnimalToken()
  }, [account])
  // view
  return (
    <>
      {isLoading && (
        <Flex
          width="full"
          height="full"
          position="absolute"
          justifyContent="center"
          alignItems="center"
          bg="whiteAlpha.700"
          zIndex={1}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      )}
      <Grid templateColumns="repeat(2, 1fr)" gap={4} h="full" pt={2}>
        {onSaleAnimalCards.map((card, index) => (
          <SaleAnimalCard
            key={index}
            account={account}
            setLoading={setLoading}
            owner={card.owner}
            animalTokenId={card.animalTokenId}
            animalType={card.animalType}
            animalPrice={card.animalPrice}
          />
        ))}
      </Grid>
    </>
  )
}

export default SaleAnimal
