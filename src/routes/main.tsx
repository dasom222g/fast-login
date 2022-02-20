import React, { FC, useEffect, useState } from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'
import { mintAnimalTokenContract } from '../web3Config'

interface MainProps {
  account: string
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalCard, setAnimalCard] = useState<string>('')
  const handleMint = async () => {
    try {
      if (!account) return
      // mintAnimalTokenContract 주소로 가스비 보내짐
      const res = await mintAnimalTokenContract.methods.mintAnimalToken().send({from: account})
      console.log('res', res)
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <Flex w="full" h="100vh" justifyContent="center" alignItems="center" direction="column">
      {newAnimalCard ? (
        <div>Animal card</div>
      ) : (
        <Box>
          <Text>Let's mint animal card!!</Text>
        </Box>
      )}
      <Button size="sm" colorScheme={'pink'} mt={4} onClick={handleMint}>
        Mint
      </Button>
    </Flex>
  )
}

export default Main
