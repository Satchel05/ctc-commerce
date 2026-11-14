import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Stack,
  Text,
  Card,
  Button,
} from "@chakra-ui/react";
import { LuMenu } from "react-icons/lu";
import { BsBagFill } from "react-icons/bs";
import { backend } from "../lib/backend.js";
import BuyNow from "../components/BuyNow.jsx";
import FilterSidebar from "../components/ui/FilterSidebar.jsx";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await backend.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      pt="40px"
      pr="40px"
      pl="40px"
    >
      <Box display={isSidebarOpen ? "intial" : "none"}>
        <FilterSidebar onClose={setIsSidebarOpen} />
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <LuMenu
          style={{ width: "28px", height: "28px" }}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        <Heading
          color="#000"
          fontFamily="body"
          fontSize="2xl"
          fontStyle="normal"
          fontWeight="medium"
          lineHeight="32px"
        >
          Products
        </Heading>
        <BsBagFill style={{ width: "28px", height: "28px", fill: "#000" }} />
      </Box>

      <Text
        color="#18181B"
        fontFamily="Inter"
        fontSize="16px"
        fontStyle="normal"
        fontWeight="500"
        lineHeight="16px"
        alignSelf="stretch"
        mt="32px"
      >
        All Items
      </Text>
      <Stack
        gap="32px"
        mt="20px"
        direction={{ base: "column", md: "row" }}
        flexWrap={{ base: "nowrap", md: "wrap" }}
        align="center"
        justify="center"
      >
        {products.map((product) => (
          <Card.Root
            key={product.id}
            maxW="sm"
            overflow="hidden"
            cursor="pointer"
            onClick={() => nav(`/products/${product.id}`)}
          >
            <Image
              src={product.image_url}
              alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
              <Card.Title>{product.name}</Card.Title>
              <Card.Description>{product.description}</Card.Description>
              <Text
                textStyle="2xl"
                fontWeight="medium"
                letterSpacing="tight"
                mt="2"
              >
                ${product.price}
              </Text>
            </Card.Body>
            <Card.Footer gap="2">
              <Button
                variant="solid"
                onClick={(event) => {
                  event.stopPropagation();
                  setSelectedProduct(product);
                }}
              >
                Buy now
              </Button>
              <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </Stack>

      <BuyNow
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  );
}
