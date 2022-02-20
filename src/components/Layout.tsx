import React, { FC } from 'react'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Layout: FC = ({ children }) => {
  return (
    <Stack h="100vh">
      <Flex bg="purple.200" p={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Text fontWeight="bold">Somi NFT Market</Text>
        </Box>
        <Box>
          <Link to="/">
            <Button colorScheme="pink">Main</Button>
          </Link>
          <Link to="my-animal">
            <Button colorScheme="green" ml={2}>My Animal</Button>
          </Link>
        </Box>
      </Flex>
      <Flex
        h="full"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Flex>
    </Stack>
  )
}

export default Layout
