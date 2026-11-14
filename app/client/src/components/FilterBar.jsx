import { Button, IconButton, Menu, Portal } from '@chakra-ui/react'

function FilterMenu({ label, options, onSelect }) {
  return (
    <Menu.Root onSelect={(d) => onSelect(d.value)}>
      <Menu.Trigger asChild>
        <Button variant="outline" size="xs">{label}<img src="/assets/shopping/arrow-down.svg" alt="" /></Button>
      </Menu.Trigger>
      <Portal><Menu.Positioner><Menu.Content>
        {options.map((o) => <Menu.Item key={o.value} value={o.value}>{o.label}</Menu.Item>)}
      </Menu.Content></Menu.Positioner></Portal>
    </Menu.Root>
  )
}

export default function FilterBar({ onSort, onColor, sort }) {
  return (
    <div className="shop-filters">
      <IconButton aria-label="Reverse price sort" variant="outline" size="xs"
        onClick={() => onSort(sort === 'asc' ? 'desc' : 'asc')}>
        <img src="/assets/shopping/sort.svg" alt="" />
      </IconButton>
      <div className="shop-filter-menus">
        <FilterMenu label="Price" onSelect={onSort} options={[
          { value: 'asc', label: 'Low to high' }, { value: 'desc', label: 'High to low' },
        ]} />
        <FilterMenu label="Color" onSelect={onColor} options={[
          { value: 'all', label: 'All colors' }, { value: 'black', label: 'Black' },
          { value: 'white', label: 'White' }, { value: 'gray', label: 'Gray' },
        ]} />
      </div>
    </div>
  )
}
