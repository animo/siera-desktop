import type { Agent } from '@aries-framework/core'
import type { TablerIcon } from '@tabler/icons'

import { Divider, Navbar, NavLink, ScrollArea } from '@mantine/core'
import React, { useState } from 'react'

import { LayoutAvatar } from './LayoutAvatar'

interface NavigationItem {
  name: string
  href: string
  icon: TablerIcon
}

interface LayoutNavigationProps {
  navigationItems: NavigationItem[]
  agent: Agent
}

export const LayoutNavBar = ({ navigationItems, agent }: LayoutNavigationProps) => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Navbar p="xs" width={{ base: 300 }}>
      <Navbar.Section mt="xs">{/* Header with logo */}</Navbar.Section>
      <Navbar.Section grow component={ScrollArea} mx="-xs" px="xs">
        {navigationItems.map((item, index) => (
          <NavLink
            key={item.name}
            active={index === activeIndex}
            label={item.name}
            icon={<item.icon size={16} stroke={1.5} />}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Navbar.Section>
      <Navbar.Section>
        <Divider />
        <LayoutAvatar agent={agent} />
      </Navbar.Section>
    </Navbar>
  )
}
