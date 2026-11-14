import { useState } from "react";
import { Box, Flex, VStack, Text, IconButton, Button, } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

export default function FilterSidebar({ onClose }) {
    const categories = [
        "All Items",
        "Apparel",
        "Accessories",
        "Gifts",
    ];

    return (
        <Box
            bg="black"
            color="white"
            width="328px"
            height="100vh"
            pt="80px"
            px="40px"
            pb="40px"
        >
            
            <Flex justify="space-between" align="center" mb="24px">
                <Text fontSize="24px">
                    The Figma Store
                </Text>

                <IconButton
                    aria-label="Close filters"
                    icon={<CloseIcon />}
                    variant="ghost"
                    color="white"
                    onClick={onClose}
                />
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
    )


}