import { Box, Button, Flex, Grid, Spinner, Text } from '@chakra-ui/react'
import React, { FC, useEffect, useState } from 'react'
import MyAnimalCard from '../components/MyAnimalCard'
import { IAnimalCard } from '../lib/typs'
import {
  mintAnimalTokenContract,
  saleAnimalTokenAddress,
  saleAnimalTokenContract,
  web3,
} from '../web3Config'

interface MyAnimalProps {
  account: string
}
const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  const [animalCards, setAnimalCards] = useState<IAnimalCard[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSaleStatus, setIsSaleStatus] = useState<boolean>(false)

  const getAnimalCards = async () => {
    setIsLoading(true)
    try {
      const mintCount: string = await mintAnimalTokenContract.methods
        .balanceOf(account)
        .call()
      let animalTypes: IAnimalCard[] = []
      for (let i = 0; i < Number(mintCount); i++) {
        const animalTokenId: string = await mintAnimalTokenContract.methods
          .tokenOfOwnerByIndex(account, i)
          .call()
        const animalType: string = await mintAnimalTokenContract.methods
          .animalTypeMap(animalTokenId)
          .call()
        const price: string = await saleAnimalTokenContract.methods
          .getOnSaleAnimalTokenPrice(animalTokenId)
          .call()
        // wei -> matic단위로 변환
        const animalPrice: string = web3.utils.fromWei(price)
        animalTypes = [
          ...animalTypes,
          { animalTokenId, animalType, animalPrice: Number(animalPrice) },
        ]
      }
      setAnimalCards(animalTypes)
    } catch (error) {
      console.log(error)
    }
    setIsLoading(false)
  }

  const getSaleStatus = async () => {
    try {
      const isSaleStatus = await mintAnimalTokenContract.methods
        .isApprovedForAll(account, saleAnimalTokenAddress)
        .call()
      setIsSaleStatus(isSaleStatus)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSaleStatus = async () => {
    if (!account) return
    setIsLoading(true)
    try {
      const res = await mintAnimalTokenContract.methods
        .setApprovalForAll(saleAnimalTokenAddress, !isSaleStatus)
        .send({ from: account })

      // transaction 정상 완료 후 isSaleStatus 변경
      res.status && setIsSaleStatus(!isSaleStatus)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (!account) return
    getSaleStatus()
    getAnimalCards()
  }, [account])

  useEffect(() => {
    console.log('animalCards', animalCards)
  }, [animalCards])

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
      <Flex justifyContent="center" alignItems="center" mt={10} pb={4}>
        <Text>Sale Status: {isSaleStatus ? 'True' : 'False'}</Text>
        <Button
          size="xs"
          ml={2}
          colorScheme={isSaleStatus ? 'red' : 'blue'}
          onClick={handleSaleStatus}
        >
          {isSaleStatus ? 'Cancel' : 'Approve'}
        </Button>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap={4} h="full">
        {animalCards.map((item, index) => (
          <MyAnimalCard
            key={index}
            animalTokenId={item.animalTokenId}
            animalType={item.animalType}
            animalPrice={item.animalPrice}
            account={account}
            isSaleStatus={isSaleStatus}
          />
        ))}
      </Grid>
    </>
  )
}

export default MyAnimal
