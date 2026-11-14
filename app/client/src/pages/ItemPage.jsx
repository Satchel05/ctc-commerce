import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Center, Container, Box, Button, Circle, Text, Image, Spinner, Stack, HStack, IconButton, AspectRatio } from '@chakra-ui/react'
import { LuCheck, LuChevronLeft } from 'react-icons/lu'
import { backend } from '../lib/backend.js'

// Hardcoded until the database stores real options per product
const SIZES = ['S', 'M', 'L']
const COLORS = ['#DD6B20', '#C53030', '#38A169', '#3B6FE0']

// Shared click feel: smooth color changes plus a slight shrink while pressed
const PRESSABLE = {
    transitionProperty: 'background-color, border-color, color, transform',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',
    _active: { transform: 'scale(0.96)' },
    _motionReduce: { transition: 'none' },
}

export default function ItemPage() {
    const { id } = useParams();
    const navigate = useNavigate()

    const [ product, setProduct ] = useState(null);
    const [ isLoading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);
    const [ selectedSize, setSelectedSize ] = useState(SIZES[0]);
    const [ selectedColor, setSelectedColor ] = useState(COLORS[0]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await backend.get(`/api/products/${id}`);
                setProduct(response.data)
            }
            catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        }

        fetchProduct()
    }, [id])

    if (isLoading) {
        return <Center h="100dvh"><Spinner size="xl" /></Center>
    }
    if (error) {
        return <Container maxW="sm" py="6"><Text>Error: {error}</Text></Container>
    }

    const handleAddToCart = () => {
        console.log({ productId: product.id, size: selectedSize, color: selectedColor })
    }

    return (
        <Container
            maxW='sm'
            pt='8'
            minH='100dvh'
            display='flex'
            flexDirection='column'
            // Fade + slide up when the page opens
            animationName='fade-in, slide-from-bottom'
            animationDuration='0.35s'
            animationTimingFunction='ease-out'
            css={{ '--slide-from-bottom-distance': '1.5rem' }}
            _motionReduce={{ animation: 'none' }}
        >
            <Stack gap='5' flex='1'>
                <IconButton
                    aria-label="Go back"
                    variant="ghost"
                    size='xl'
                    alignSelf="flex-start"
                    ml='-3'
                    _icon={{ boxSize: '6' }}
                    mb='4'
                    onClick={() => navigate(-1)}
                >
                    <LuChevronLeft />
                </IconButton>
                <AspectRatio ratio={1} bg='gray.100'>
                    <Image src={product.image_url} alt={product.name} objectFit='contain' />
                </AspectRatio>
                <HStack justify="space-between" align='baseline' mb='2'>
                    <Text textStyle='xl' fontWeight='semibold'>{product.name}</Text>
                    <Text textStyle='xl' flexShrink={0}>${product.price.toFixed(2)}</Text>
                </HStack>

                <Box>
                    <Text textStyle='lg' mb='3'>Size</Text>
                    <HStack gap='3'>
                        {SIZES.map((size) => (
                            <Button
                                key={size}
                                flex='1'
                                size='lg'
                                fontWeight='semibold'
                                variant={size === selectedSize ? 'subtle' : 'outline'}
                                {...PRESSABLE}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </Button>
                        ))}
                    </HStack>
                </Box>

                <Box>
                    <Text textStyle='lg' mb='3'>Color</Text>
                    <HStack gap='3'>
                        {COLORS.map((color) => (
                            <Circle
                                key={color}
                                as='button'
                                size='14'
                                bg={color}
                                color='white'
                                cursor='pointer'
                                aria-label={`Select color ${color}`}
                                onClick={() => setSelectedColor(color)}
                                {...PRESSABLE}
                                _active={{ transform: 'scale(0.9)' }}
                            >
                                {/* Always rendered so the check can fade/pop in instead of appearing instantly */}
                                <Box
                                    opacity={color === selectedColor ? 1 : 0}
                                    transform={color === selectedColor ? 'scale(1)' : 'scale(0.4)'}
                                    transition='opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
                                    _motionReduce={{ transition: 'none' }}
                                >
                                    <LuCheck />
                                </Box>
                            </Circle>
                        ))}
                    </HStack>
                </Box>

                <Text color='fg.muted' mt='2'>{product.description}</Text>

                <Box
                    position='sticky'
                    bottom='0'
                    mt='auto'
                    bg='bg'
                    pt='4'
                    pb='8'
                    // Fade strip above the button so scrolling text dissolves instead of cutting off
                    _before={{
                        content: '""',
                        position: 'absolute',
                        bottom: '100%',
                        left: '0',
                        right: '0',
                        h: '12',
                        bgGradient: 'to-t',
                        gradientFrom: 'bg',
                        gradientTo: 'transparent',
                        pointerEvents: 'none',
                    }}
                >
                    <Button
                        h='16'
                        w='full'
                        textStyle='xl'
                        bg='gray.900'
                        color='white'
                        {...PRESSABLE}
                        _hover={{ bg: 'gray.700' }}
                        _active={{ transform: 'scale(0.98)' }}
                        onClick={handleAddToCart}
                    >
                        Add to cart
                    </Button>
                </Box>
            </Stack>
        </Container>
    )
}