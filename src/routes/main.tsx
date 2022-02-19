import React, { FC, useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";

const Main: FC = () => {
  const [account, setAccount] = useState<string>("")
  const getAccount = async () => {
    try {
      if (window.ethereum) { // metamask설치되어 있는경우
        // 브라우저에서 metamask 연결 요청하여 account배열 get
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        setAccount(accounts[0])
        return
      }
      alert('Install Meta Mask!') // metamask 설치되지 않은 경우
    } catch(error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getAccount()
  }, [])
  useEffect(() => {
    console.log('account', account)
  }, [account])

  return <Box backgroundColor="blue" color="white">Main page</Box>
}

export default Main