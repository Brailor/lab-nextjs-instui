import React from 'react';
import { Menu} from '@instructure/ui-menu';
import { Button } from '@instructure/ui-buttons';
import { View } from '@instructure/ui-view';

const MenuExample = () => {
  const [singleSelection, setSingleSelection] = React.useState(['itemOne']);
  const [multipleSelection, setMultipleSeleciton] = React.useState(['optionOne', 'optionThree']);

  const handleSingleSelect = (e, newSelected) => {
    setSingleSelection(newSelected);
  };

  const handleMultipleSelect = (e, newSelected) => {
    setMultipleSelection(newSelected);
  };

  return (
    <View padding="medium" textAlign="center">
      <Menu placement="bottom" trigger={<Button>Menu</Button>} mountNode={() => document.getElementById('main')}>
        <Menu.Item value="mastery">Learning Mastery</Menu.Item>
        <Menu.Item href="https://instructure.github.io/instructure-ui/">Default (Grid view)</Menu.Item>
        <Menu.Item disabled>Individual (List view)</Menu.Item>
        <Menu label="More Options">
          <Menu.Group allowMultiple label="Select Many" selected={multipleSelection} onSelect={handleMultipleSelect}>
            <Menu.Item value="optionOne">Option 1</Menu.Item>
            <Menu.Item value="optionTwo">Option 2</Menu.Item>
            <Menu.Item value="optionThree">Option 3</Menu.Item>
          </Menu.Group>
          <Menu.Separator />
          <Menu.Item value="navigation">Navigation</Menu.Item>
          <Menu.Item value="set">Set as default</Menu.Item>
        </Menu>
        <Menu.Separator />
        <Menu.Group label="Select One" selected={singleSelection} onSelect={handleSingleSelect}>
          <Menu.Item value="itemOne">Item 1</Menu.Item>
          <Menu.Item value="itemTwo">Item 2</Menu.Item>
        </Menu.Group>
        <Menu.Separator />
        <Menu.Item value="baz">Open grading history...</Menu.Item>
      </Menu>
    </View>
  );
};

export default MenuExample;
