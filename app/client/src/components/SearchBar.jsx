import { Input, InputGroup } from '@chakra-ui/react'

export default function SearchBar({ value, onChange }) {
  return (
    <InputGroup startElement={<img src="/assets/shopping/search.svg" alt="" />}>
      <Input aria-label="Search products" placeholder="Search" value={value}
        onChange={(e) => onChange(e.target.value)} />
    </InputGroup>
  )
}
