import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { Icon } from "@chakra-ui/react"
import { MdOutlineShoppingCart } from "react-icons/md"
import { backend } from '../lib/backend.js'

// const colors = ['#f8f8f8', '#e3e1dc', '#25294d']
// const sizes = ['XS', 'S', 'M', 'L', 'XL']

export default function ItemDetails({ item: suppliedItem , setCartItems }) {
  const { id } = useParams()
  const [item, setItem] = useState(suppliedItem)
  const [loading, setLoading] = useState(!suppliedItem)
  const [error, setError] = useState(null)


  useEffect(() => {
    if (suppliedItem || !id) return

    const fetchItem = async () => {
      try {
        const response = await backend.get(`/api/products/${id}`)
        setItem(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchItem()
  }, [id, suppliedItem])

  if (loading) return <Text p="6">Loading...</Text>
  if (error) return <Text p="6">Error: {error}</Text>
  if (!item) return <Text p="6">Item not found.</Text>

  const {
    image_url: imageUrl,
    name,
    price,
    description,
    brand,
    category,
  } = item

  return (
    <Box minH="100vh" bg="white" color="#171717">
      <Box maxW="402px" mx="auto" px="16px" pt="18px" pb="92px">
        <Stack direction="row" align="center" justify="space-between" mb="18px">
          <Button
            variant="plain"
            p="0"
            minW="auto"
            h="24px"
            fontSize="24px"
            fontWeight="400"
            lineHeight="1"
            aria-label="Go back"
            onClick={() => window.history.back()}
          >
            ←
          </Button>
          <Text fontSize="16px" fontWeight="600">
            Details
          </Text>
          <Button
            variant="plain"
            p="0"
            minW="24px"
            h="24px"
            fontSize="24px"
            fontWeight="400"
            lineHeight="1"
            aria-label="Add to wishlist"
          >
            ♡
          </Button>
        </Stack>

        <Box bg="#eeeeee" borderRadius="8px" overflow="hidden" h="365px">
          <Image
            src={imageUrl}
            alt={name}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>

        <Stack direction="row" align="center" justify="space-between" mt="10px">
          <Text fontSize="10px" color="#9562a5" fontWeight="600">
            {category?.name || 'UNISEX'} · {brand?.name || 'Everyday'}
          </Text>
          <Text fontSize="10px" fontWeight="600">
            ★ 4.0 <Text as="span" color="#777" fontWeight="400">(254 Reviews)</Text>
          </Text>
        </Stack>

        <Heading mt="7px" fontSize="27px" lineHeight="1.1" fontWeight="600">
          {name}
        </Heading>
        <Text mt="4px" fontSize="16px" fontWeight="500">
          ${Number(price).toFixed(2)}
        </Text>

        <Text mt="22px" fontSize="11px" fontWeight="500">
          Color: <Text as="span" color="#777">Off White</Text>
        </Text>
        {/* <Stack direction="row" gap="10px" mt="8px">
          {colors.map((color, index) => (
            <Button
              key={color}
              aria-label={`Select color ${index + 1}`}
              onClick={() => setSelectedColor(index)}
              p="2px"
              minW="30px"
              h="30px"
              borderRadius="full"
              border="1px solid"
              borderColor={selectedColor === index ? '#171717' : '#d8d8d8'}
              bg="white"
            >
              <Box w="22px" h="22px" borderRadius="full" bg={color} />
            </Button>
          ))}
        </Stack> */}

        {/* <Stack direction="row" align="center" justify="space-between" mt="20px">
          <Text fontSize="11px" fontWeight="500">
            Size: <Text as="span" color="#777">{selectedSize}</Text>
          </Text>
          <Button variant="plain" p="0" minW="auto" h="auto" fontSize="10px" color="#777">
            Size Guide
          </Button>
        </Stack> */}
        {/* <SimpleGrid columns={5} gap="8px" mt="8px">
          {sizes.map((size) => (
            <Button
              key={size}
              onClick={() => setSelectedSize(size)}
              h="30px"
              minW="0"
              border="1px solid"
              borderColor={selectedSize === size ? '#171717' : '#e3e3e3'}
              bg={selectedSize === size ? '#f5f5f5' : 'white'}
              borderRadius="3px"
              fontSize="10px"
              fontWeight="500"
            >
              {size}
            </Button>
          ))}
        </SimpleGrid>
        */}

        <Box borderTop="1px solid #eeeeee" mt="22px" pt="18px">
          <Text fontSize="11px" lineHeight="1.55" color="#444">
            {description || 'A thoughtfully designed everyday essential made for comfortable, effortless wear.'}
          </Text>
        </Box>
      </Box>
      <Box
        position="fixed"
        bottom="0"
        insetInlineStart="0"
        insetInlineEnd="0"
        zIndex="1000"
        w="100%"
        pt="10px"
        pb="calc(10px + env(safe-area-inset-bottom))"
        bg="rgba(255, 255, 255, 0.96)"
        borderTop="1px solid #eeeeee"
        backdropFilter="blur(8px)"
      >
        <Box maxW="402px" mx="auto" px="16px">
          <Button
            w="100%"
            h="42px"
            bg="#a5efad"
            color="#171717"
            borderRadius="3px"
            fontSize="12px"
            fontWeight="600"
            _hover={{ bg: '#8fe39a' }}
            _active={{ bg: '#81d98b', transform: 'translateY(1px)' }}
          >
            <Text flex="1">Add to cart</Text>
            <Icon size="md" >
<MdOutlineShoppingCart />  </Icon>
            {/* <Text fontSize="17px" lineHeight="1">🛒</Text> */}

          </Button>
        </Box>
      </Box>
    </Box>
  )
}
