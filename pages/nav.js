import React from 'react'
import { Navigation, NavigationItem} from '@instructure/ui-navigation'
import { Avatar } from '@instructure/ui-avatar'


const Example = () => {
    return (
        <Navigation
  label="Main navigation"
  toggleLabel={{
    expandedLabel: 'Minimize Navigation',
    minimizedLabel: 'Expand Navigation'
  }}
>
  <NavigationItem
    label="Home 1"
   icon={<Avatar label='asdd'>dasd</Avatar>}
  />
  <NavigationItem
    label="Home1"
   icon={<Avatar label='asfff'>dasd</Avatar>}
  />
</Navigation>
    )
}

export default Example