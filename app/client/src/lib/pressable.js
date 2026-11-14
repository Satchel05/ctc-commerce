// Shared click feel: smooth color changes plus a slight shrink while pressed.
// Spread onto Chakra components: <Button {...PRESSABLE} />
export const PRESSABLE = {
    transitionProperty: 'background-color, border-color, color, transform, box-shadow',
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease-out',
    _active: { transform: 'scale(0.96)' },
    _motionReduce: { transition: 'none' },
}

// Check mark that fades/pops in when `visible` flips, instead of appearing instantly
export const checkStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'scale(1)' : 'scale(0.4)',
    transition: 'opacity 0.2s ease-out, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
    _motionReduce: { transition: 'none' },
})
