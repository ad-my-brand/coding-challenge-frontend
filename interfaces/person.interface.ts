export type Geo = {
  lat: number
  lng: number
}

type Address = {
  city: string
  geo: Geo
  street: string
  suite: string
  zipcode: string
}

type Company = {
  bs: string
  catchPhrase: string
  name: string
}

type Person = {
  address: Address
  company: Company
  email: string
  id: number
  name: string
  phone: string
  username: string
  website: string
}

export default Person
