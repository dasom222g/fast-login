import React, { FC } from 'react'

interface MyAnimalProps {
  account: string
}
const MyAnimal: FC<MyAnimalProps> = ({ account }) => {
  return <div>MyAnimal</div>
}

export default MyAnimal
