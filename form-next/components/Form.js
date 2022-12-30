import {
  Box,
  Stack,
  Heading,
  Container,
  Button,
  SimpleGrid,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { FormControl as ChakhraControl, FormLabel, Select } from "@chakra-ui/react";
import { FromControl } from "./FormControl";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

export default function Form() {
  // dynamic import for Map component
  const DynamicMap = dynamic(
    () => import('./Map').then(mod => mod.Map), {
    ssr: false,
    loading: () => 'Loading...',
  }
  )

  // form state
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [allUsers, setAllUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(undefined);
  const [isFormSuccess, setFormSuccess] = useState(false)
  const [loading, setLoading] = useState(true)
  const toast = useToast();
  const [validTitle, setValidTitle] = useState(true)
  const [validBody, setValidBody] = useState(true)

  const router = useRouter()

  // function for handling validation
  const handleValidation = (message) => {
    return <FormErrorMessage>{message}</FormErrorMessage>
  }

  // function to fetch users
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then(
      res => res.json()
    ).then(
      data => {
        setAllUsers(data)
        console.log(data)
        setLoading(false)
      }
    )
  }, [])


  // handle user selection
  const handleSelect = (id) => {
    const user = allUsers.filter(
      user => parseInt(user.id) === parseInt(id)
    )
    setSelectedUser(user[0])
  }

  // handle Submit function 
  const handleSubmit = async (event) => {
    if (!selectedUser) {
      toast({
        position: 'top',
        colorScheme: 'red',
        description: 'Please select a user.',
        status: 'error'
      })
      return
    }

    if (!title) {
      setValidTitle(false)
      toast({
        position: 'top',
        colorScheme: 'red',
        description: 'Please provide title',
        status: 'error'
      })
      return
    }

    if (!body) {
      setValidBody(false)
      toast({
        position: 'top',
        description: 'Please provide body',
        status: 'error'
      })
      return
    }

    setLoading(true)
    await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      data: JSON.stringify({
        name: selectedUser.name,
        body: body,
        userId: selectedUser.id
      })


    }).then(res => {
      if (res.status === 201) {
        toast(
          {
            description: 'Form submitted successfully.',
            position: 'top',
            status: 'success'
          }
        )
      }
      return res.json()
    }).then(
      result => result
    ).catch(
      reject => toast(
        {
          position: 'top',
          status: 'error',
          description: 'Error while sending your data. Retry please.'
        }
      )
    )
    setLoading(false)
    setTitle('')
    setBody('')
    setSelectedUser(undefined)
    router.push('/success')

  }

  return <>
    <Box position={"relative"}>
      <Container
        as={SimpleGrid}
        maxW={"xl"}
        columns={1}
        spacing={{ base: 10, lg: 32 }}
        py={10}
      >
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: "lg" }}
        >
          <Stack spacing={4}>
            <Heading
              color={"gray.800"}
              lineHeight={1.1}
              fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
            >
              Simple Form
            </Heading>
          </Stack>
          <Box as={"form"} mt={10}>
            <Stack spacing={4}>
              {/* Map */}
              <Box height={'348px'}>
                <DynamicMap position={selectedUser && selectedUser.address.geo} />
              </Box>
              <ChakhraControl >
                <FormLabel>User</FormLabel>
                <Select variant={'filled'} placeholder='Select location' onChange={(event) => handleSelect(event.target.value)}>
                  {allUsers.map(
                    (user, index) => <option key={index} value={user.id} data-name={user.name} data-id={user.id} data-lat={user.address.geo.lat} data-lng={user.address.geo.lng}>
                      {user.name}
                    </option>
                  )}
                </Select>
              </ChakhraControl>
              <FromControl validate={validTitle} label={'Title'} value={title} onChange={(data) => {
                if (title) {
                  setValidTitle(true)
                }
                setTitle(data)
              }
              } handleValidation={() => handleValidation("Title is required.")} />
              <FromControl validate={validBody} label={'Body'} value={body} onChange={(data) => {
                if (body) {
                  setValidBody(true)
                }
                setBody(data)
              }} handleValidation={() => handleValidation("Body is required.")} />
            </Stack>
            <Button
              fontFamily={"heading"}
              mt={8}
              w={"full"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              onClick={handleSubmit}
              isLoading={loading}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
    </Box>
  </>
}

