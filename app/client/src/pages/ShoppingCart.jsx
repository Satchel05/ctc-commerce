import { useEffect, useState } from 'react'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { backend } from '../lib/backend.js'
import CartItem from '../components/CartItem.jsx'
import { ArrowLeft, ArrowUpRight } from '../components/icons.jsx'

const TAX_RATE = 0.0775

const formatPrice = (value) => `$${Number(value).toFixed(2)}`

// cartItems: [{ id: productId, qty, size }] — product details are loaded from the API.
export default function ShoppingCart({ cartItems = [], setCartItems }) {
  const [products, setProducts] = useState({})
  const [error, setError] = useState(null)

  const missing = [...new Set(cartItems.map((item) => item.id))].filter((id) => !products[id])
  const loading = missing.length > 0 && !error
  const missingKey = missing.join(',')

  useEffect(() => {
    if (!missingKey) return

    const fetchProducts = async () => {
      try {
        const ids = missingKey.split(',')
        const responses = await Promise.all(ids.map((id) => backend.get(`/api/products/${id}`)))
        setProducts((prev) => {
          const next = { ...prev }
          responses.forEach((res) => { next[res.data.id] = res.data })
          return next
        })
      } catch (err) {
        setError(err.message)
      }
    }
    fetchProducts()
  }, [missingKey])

  const removeItem = (id, size) =>
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)))

  const lines = cartItems
    .filter((item) => products[item.id])
    .map((item) => ({ ...item, product: products[item.id] }))

  const subtotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)
  const tax = subtotal * TAX_RATE

  const summary = [
    { label: 'Subtotal', value: formatPrice(subtotal) },
    { label: 'Tax', value: formatPrice(tax) },
    { label: 'Shipping', value: 'Free' },
  ]

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
          <Heading as="h1" flex="1" fontSize="28px" fontWeight="semibold" lineHeight="normal" color="gray.800">
            Shopping Cart
          </Heading>
        </Flex>

        <Stack gap="20px" aria-busy={loading}>
          {loading ? <Text role="status">Loading cart…</Text>
            : error ? <Text role="alert">Unable to load cart: {error}</Text>
            : lines.length ? lines.map((line) => (
              <CartItem key={`${line.id}-${line.size}`} item={line} onRemove={removeItem} />
            ))
            : <Text role="status">Your cart is empty.</Text>}
        </Stack>
      </Stack>

      {/* Checkout and Summary (sticky) */}
      <Stack
        position="sticky"
        bottom="0"
        zIndex="sticky"
        gap="20px"
        px="32px"
        pt="20px"
        pb="34px"
        bg="bg.subtle"
      >
        <Stack gap="10px" p="20px" bg="bg" rounded="10px">
          <Text fontSize="16px" fontWeight="semibold" lineHeight="normal" color="gray.800">
            Order Summary
          </Text>
          {summary.map(({ label, value }) => (
            <Flex key={label} justify="space-between" align="center" fontSize="16px" lineHeight="normal">
              <Text color="gray.400">{label}</Text>
              <Text color="gray.800">{value}</Text>
            </Flex>
          ))}
        </Stack>

        <Button
          w="full"
          h="auto"
          minW="24px"
          px="5"
          py="4"
          gap="1"
          bg="green.300"
          color="gray.800"
          rounded="l3"
          fontSize="20px"
          fontWeight="medium"
          lineHeight="16px"
          justifyContent="space-between"
          disabled={!lines.length}
        >
          <Text as="span" flex="1" textAlign="left">
            Proceed to checkout
          </Text>
          <ArrowUpRight />
        </Button>
      </Stack>
    </Flex>
  )
}
