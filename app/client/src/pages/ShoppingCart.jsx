import { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { backend } from '../lib/backend.js'
import CartItem from '../components/CartItem.jsx'
import { ArrowLeft, ArrowUpRight } from '../components/icons.jsx'

const TAX_RATE = 0.0775

const formatPrice = (value) => `$${value.toFixed(2)}`

export default function ShoppingCart({ cartItems = [], setCartItems }) {
  const [products, setProducts] = useState(null)
  const [error, setError] = useState(null)

  // Load the product catalog once and look up cart items by id.
  useEffect(() => {
    backend
      .get('/api/products')
      .then((res) => setProducts(Object.fromEntries(res.data.map((p) => [p.id, p]))))
      .catch((err) => setError(err.message))
  }, [])

  const removeItem = (id, size) =>
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)))

  const lines = cartItems
    .filter((item) => products?.[item.id])
    .map((item) => ({ ...item, product: products[item.id] }))

  const subtotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)

  const summary = [
    ['Subtotal', formatPrice(subtotal)],
    ['Tax', formatPrice(subtotal * TAX_RATE)],
    ['Shipping', 'Free'],
  ]

  let content
  if (error) content = <Text role="alert">Unable to load cart: {error}</Text>
  else if (!products) content = <Text role="status">Loading cart…</Text>
  else if (!lines.length) content = <Text role="status">Your cart is empty.</Text>
  else content = lines.map((line) => (
    <CartItem key={`${line.id}-${line.size}`} item={line} onRemove={removeItem} />
  ))

  return (
    <Flex
      direction="column"
      w="402px"
      minH="874px"
      bg="bg.subtle"
      rounded="25px"
      overflow="clip"
      fontFamily="'Funnel Sans', sans-serif"
    >
      {/* Title and Items (scrolls) */}
      <Stack flex="1" gap="30px" px="32px" pt="80px" pb="20px">
        <Flex align="center" gap="20px">
          <Link to="/" aria-label="Back">
            <Box color="gray.800">
              <ArrowLeft />
            </Box>
          </Link>
          <Heading as="h1" fontSize="28px" fontWeight="semibold" color="gray.800">
            Shopping Cart
          </Heading>
        </Flex>

        <Stack gap="20px">{content}</Stack>
      </Stack>

      {/* Checkout and Summary (sticky) */}
      <Stack position="sticky" bottom="0" gap="20px" px="32px" pt="20px" pb="34px" bg="bg.subtle">
        <Stack gap="10px" p="20px" bg="bg" rounded="10px" fontSize="16px">
          <Text fontWeight="semibold" color="gray.800">Order Summary</Text>
          {summary.map(([label, value]) => (
            <Flex key={label} justify="space-between">
              <Text color="gray.400">{label}</Text>
              <Text color="gray.800">{value}</Text>
            </Flex>
          ))}
        </Stack>

        <Button
          h="auto"
          px="5"
          py="4"
          bg="green.300"
          color="gray.800"
          rounded="l3"
          fontSize="20px"
          fontWeight="medium"
          justifyContent="space-between"
          disabled={!lines.length}
        >
          Proceed to checkout
          <ArrowUpRight />
        </Button>
      </Stack>
    </Flex>
  )
}
