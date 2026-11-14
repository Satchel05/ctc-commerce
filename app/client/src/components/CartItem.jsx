import { Badge, Box, Flex, HStack, Image, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { XIcon } from './icons.jsx'

export default function CartItem({ item, onRemove }) {
  const { product, qty, size } = item
  const badges = [size && `Size: ${size}`, product.category?.name].filter(Boolean)

  return (
    <Flex align="flex-start" justify="space-between" p="20px" bg="bg" rounded="10px">
      <Box boxSize="100px" flexShrink={0} rounded="5px" overflow="hidden">
        <Image
          src={product.thumbnail_url || product.image_url}
          alt={product.name}
          w="full"
          h="full"
          objectFit="cover"
        />
      </Box>

      <Flex direction="column" justify="space-between" w="136px" h="100px">
        <Flex direction="column" justify="space-between" h="60px">
          <Link to={`/item/${product.id}`}>
            <Text fontSize="16px" lineHeight="normal" color="gray.800">
              {product.name}
            </Text>
          </Link>
          <HStack gap="3px">
            {badges.map((label) => (
              <Badge
                key={label}
                colorPalette="purple"
                variant="subtle"
                size="xs"
                px="1"
                minH="16px"
                rounded="l2"
                fontFamily="'Inter', sans-serif"
                fontSize="10px"
                lineHeight="14px"
              >
                {label}
              </Badge>
            ))}
          </HStack>
          <Text fontSize="12px" lineHeight="normal" color="gray.400">
            Qty: {qty}
          </Text>
        </Flex>
        <Text fontSize="12px" lineHeight="normal" color="gray.800">
          ${(product.price * qty).toFixed(2)}
        </Text>
      </Flex>

      <Box
        as="button"
        aria-label="Remove item"
        color="gray.400"
        flexShrink={0}
        cursor="pointer"
        onClick={() => onRemove?.(item.id, size)}
      >
        <XIcon />
      </Box>
    </Flex>
  )
}
