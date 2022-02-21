import React, { FC } from 'react'
import { Box, Button, Flex, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const Layout: FC = ({ children }) => {
  return (
    <Stack h="100vh">
      <Flex bg="purple.200" p={4} alignItems="center">
        <Box>
          <Text fontWeight="bold">Somi NFT Market</Text>
        </Box>
        <Flex ml="auto">
          <Link to="/">
            <Button size="sm" colorScheme="pink">Main</Button>
          </Link>
          <Link to="my-animal">
            <Button size="sm" colorScheme="green" ml={2}>My Animal</Button>
          </Link>
          <Link to="sale-animal">
            <Button size="sm" colorScheme="blue" ml={2}>Sale Animal</Button>
          </Link>
        </Flex>
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
