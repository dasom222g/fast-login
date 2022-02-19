import React, { FC, useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

interface MainProps {
  account: string
}

const Main: FC<MainProps> = ({ account }) => {
  const [newAnimalCard, setAnimalCard] = useState<string>('')
  const handleMint = () => {
    console.log('click!!')
  }

  return (
    <>
      {newAnimalCard ?
        <div>Animal card</div> 
        : <Box>
            <Text>Let's mint animal card!!</Text>
          </Box>}
      <Button size="sm" colorScheme={"lightpink"} onClick={handleMint}>Mint</Button>
    </>
  )
}

export default Main