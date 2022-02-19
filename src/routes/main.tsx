import React, { FC, useEffect, useState } from 'react'
import { Box, Text, Flex, Button } from '@chakra-ui/react'

interface MainProps {
  account: string
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalCard, setAnimalCard] = useState<string>('')
  const handleMint = () => {
    console.log('click!!')
  }

  useEffect(() => {
    console.log('account', account)
  }, [account])

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
