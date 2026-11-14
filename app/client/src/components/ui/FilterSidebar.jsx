import { Box, Flex, VStack, Text, IconButton, Button } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";

export default function FilterSidebar({ isOpen, onClose }) {
  const categories = ["All Items", "Apparel", "Accessories", "Gifts"];

  return (
    <>
    {/* Dimmed backdrop: fades in with the sidebar, click it to close */}
    <Box
      position="fixed"
      inset="0"
      bg="blackAlpha.600"
      zIndex="999"
      opacity={isOpen ? 1 : 0}
      pointerEvents={isOpen ? "auto" : "none"}
      transition="opacity 0.3s ease"
      onClick={() => onClose(false)}
    />
    <Box
      bg="black"
      color="white"
      width="328px"
      height="100vh"
      pt="80px"
      px="40px"
      pb="40px"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      // Slides in from the left; visibility hides it from tabbing once closed
      transform={isOpen ? "translateX(0)" : "translateX(-100%)"}
      visibility={isOpen ? "visible" : "hidden"}
      transition="transform 0.3s cubic-bezier(0.32, 0.72, 0, 1), visibility 0.3s"
      _motionReduce={{ transition: "none" }}
    >
      <Flex justify="space-between" align="center" mb="24px">
        <Text fontSize="24px">The Figma Store</Text>

        <IconButton
          aria-label="Close filters"
          variant="ghost"
          color="white"
          onClick={() => onClose(false)}
        >
          <IoClose />
        </IconButton>
      </Flex>

      <VStack align="stretch" spacing="20px">
        {categories.map((category) => (
          <Text
            key={category}
            fontSize="20px"
            fontWeight="bold"
            cursor="pointer"
          >
            {category}
          </Text>
        ))}
      </VStack>
    </Box>
    </>
  );
}
