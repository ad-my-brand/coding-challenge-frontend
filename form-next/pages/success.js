import { Box, Heading, Text, Container, SimpleGrid } from '@chakra-ui/react';
import CheckCircleIcon from '@chakra-ui/icon';

function Success() {
  return (
    <Container
      as={SimpleGrid}
      maxW={"xl"}
      columns={1}
      spacing={{ base: 10, lg: 32 }}
      py={10}
    >

      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={'50px'} color={'green.500'} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Form Submitted Successfully.
        </Heading>
        <Text color={'gray.500'}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua.
        </Text>
      </Box>
    </Container>
  );
}

export default Success