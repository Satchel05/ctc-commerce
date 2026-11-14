import { useEffect, useState } from 'react'
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await backend.get('/api/products')
        setProducts(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>

  return (
    <Box p="4" textAlign="center">
      <Heading mb="4">Products</Heading>

      <Stack gap="4" align="center">
        {products.map((product) => (
          <Box key={product.id}>
            <Image src={product.thumbnail_url} alt={product.name} width="100px" mx="auto" />
            <Text>{product.name}</Text>
            <Text>${product.price}</Text>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
