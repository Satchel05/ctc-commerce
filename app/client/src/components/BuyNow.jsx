import { useState } from 'react'
import { Box, Button, CloseButton, Dialog, HStack, Stack, Portal, Text } from '@chakra-ui/react'
import { LuCheck } from 'react-icons/lu'
import { PRESSABLE, checkStyle } from '../lib/pressable.js'

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

    // Remember the last product so the popup keeps its content while the close animation plays
    // (Home clears `product` to null the moment the popup starts closing)
    const [shownProduct, setShownProduct] = useState(product)
    if (product && product !== shownProduct) {
      setShownProduct(product)
    }

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
      motionPreset="slide-in-bottom"
    >
      <Portal>
        <Dialog.Backdrop />

        <Dialog.Positioner p="4">
          <Dialog.Content maxW="360px">
            <Dialog.Header>
              <Stack gap="1">
                <Dialog.Title fontSize="md">
                  {shownProduct?.name}
                </Dialog.Title>

                <Text fontSize="sm">
                  ${Number(shownProduct?.price ?? 0).toFixed(2)}
                </Text>
              </Stack>
            </Dialog.Header>

            <Dialog.Body>
              <Stack gap="2">
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
                      {...PRESSABLE}
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
                      color="white"
                      {...PRESSABLE}
                      _hover={{ transform: 'scale(1.08)' }}
                      _active={{ transform: 'scale(0.9)' }}
                      onClick={() => setSelectedColor(color.name)}
                    >
                      <Box {...checkStyle(selectedColor === color.name)}>
                        <LuCheck />
                      </Box>
                    </Button>
                  ))}
                </HStack>
              </Stack>

              {shownProduct?.description && (
                <Text mt="4" fontSize="xs" color="gray.600">
                  {shownProduct.description}
                </Text>
              )}
            </Dialog.Body>

            <Dialog.Footer>
              <Button
                width="full"
                bg="black"
                color="white"
                {...PRESSABLE}
                _hover={{ bg: 'gray.700', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                _active={{ transform: 'scale(0.98)' }}
              >
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