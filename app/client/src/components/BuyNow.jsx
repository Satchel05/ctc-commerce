import { useState } from 'react'
import { Button, CloseButton, Dialog, HStack, Stack, Image, Portal, Text } from '@chakra-ui/react'

const sizes = ['S','M','L']
const colors = [
  { name: 'Orange', value: 'orange.500' },
  { name: 'Red', value: 'red.500' },
  { name: 'Green', value: 'green.500' },
  { name: 'Blue', value: 'blue.500' },
]

export default function BuyNow({ product, onClose}) {
    const [selectedSize, setSelectedSize] = useState('S')   
    const [selectedColor, setSelectedColor] = useState('Orange')

    return (
    <Dialog.Root
      open={Boolean(product)}
      onOpenChange={(details) => {
        if (!details.open) {
          onClose()
        }
      }}
      placement="center"
      size="sm"
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner p="4">
          <Dialog.Content maxW="360px">
            <Dialog.Header>
              <Stack gap="1">
                <Dialog.Title fontSize="md">
                  {product?.name}
                </Dialog.Title>

                <Text fontSize="sm">
                  ${Number(product?.price ?? 0).toFixed(2)}
                </Text>
              </Stack>
            </Dialog.Header>

            <Dialog.Body>
              <Image
                src={product?.image_url || product?.thumbnail_url}
                alt={product?.name}
                width="full"
                aspectRatio="1"
                objectFit="contain"
                bg="gray.50"
              />

              <Stack gap="2" mt="4">
                <Text fontSize="sm" fontWeight="medium">
                  Size
                </Text>

                <HStack>
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      flex="1"
                      size="sm"
                      variant={selectedSize === size ? 'subtle' : 'outline'}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </HStack>
              </Stack>

              <Stack gap="2" mt="4">
                <Text fontSize="sm" fontWeight="medium">
                  Color
                </Text>

                <HStack>
                  {colors.map((color) => (
                    <Button
                      key={color.name}
                      aria-label={color.name}
                      aria-pressed={selectedColor === color.name}
                      bg={color.value}
                      borderRadius="full"
                      boxSize="8"
                      minW="8"
                      p="0"
                      onClick={() => setSelectedColor(color.name)}
                    >
                      {selectedColor === color.name ? '✓' : ''}
                    </Button>
                  ))}
                </HStack>
              </Stack>

              {product?.description && (
                <Text mt="4" fontSize="xs" color="gray.600">
                  {product.description}
                </Text>
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <Button width="full" bg="black" color="white">
                Add to cart
              </Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger asChild>
              <CloseButton
                position="absolute"
                top="2"
                right="2"
                size="sm"
              />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
    )
}