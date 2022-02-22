export interface IAnimalCard {
  animalTokenId: string
  animalType: string
  animalPrice: string
}

export interface ISaleAnimalCard extends IAnimalCard {
  owner: string
}