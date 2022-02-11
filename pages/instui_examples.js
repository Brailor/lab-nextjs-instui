import React from 'react'
import dynamic from 'next/dynamic'
import {InPlaceEdit, Editable} from '@instructure/ui-editable'
import { Modal } from '@instructure/ui-modal'
import {Overlay, Mask} from '@instructure/ui-overlays'
import {IconUserLine} from '@instructure/ui-icons'
import {Responsive} from '@instructure/ui-responsive'
import { Alert } from '@instructure/ui-alerts'
import { Avatar } from '@instructure/ui-avatar'
import { Badge } from '@instructure/ui-badge'
import { Billboard } from '@instructure/ui-billboard'
import { Breadcrumb } from '@instructure/ui-breadcrumb'
import {
  Button,
  CondensedButton,
  ToggleButton,
  IconButton,
  CloseButton
} from '@instructure/ui-buttons'
import { Byline } from '@instructure/ui-byline'
import { Checkbox, CheckboxGroup } from '@instructure/ui-checkbox'
import { DateInput } from '@instructure/ui-date-input'
import { DateTimeInput } from '@instructure/ui-date-time-input'
import { DrawerLayout } from '@instructure/ui-drawer-layout'
import { FileDrop } from '@instructure/ui-file-drop'
import { Flex } from '@instructure/ui-flex'
import { FormFieldGroup, FormField } from '@instructure/ui-form-field'
import { Grid } from '@instructure/ui-grid'
import { Heading } from '@instructure/ui-heading'
import { Img } from '@instructure/ui-img'
import { Link } from '@instructure/ui-link'
import { InlineList, List } from '@instructure/ui-list'
import { Menu } from '@instructure/ui-menu'
import { Metric, MetricGroup } from '@instructure/ui-metric'
import { AppNav} from '@instructure/ui-navigation'
import { NumberInput } from '@instructure/ui-number-input'
import { Options } from '@instructure/ui-options'
import { Pagination } from '@instructure/ui-pagination'
import { Pill } from '@instructure/ui-pill'
import { Popover } from '@instructure/ui-popover'
import { Position } from '@instructure/ui-position'
import { ProgressBar, ProgressCircle } from '@instructure/ui-progress'
import { RadioInput, RadioInputGroup } from '@instructure/ui-radio-input'
import { RangeInput } from '@instructure/ui-range-input'
import { Rating } from '@instructure/ui-rating'
import { Select } from '@instructure/ui-select'
import { SimpleSelect } from '@instructure/ui-simple-select'
import { Spinner } from '@instructure/ui-spinner'
import { InlineSVG, SVGIcon } from '@instructure/ui-svg-images'
import { Table } from '@instructure/ui-table'
import { Tag } from '@instructure/ui-tag'
import { Tabs } from '@instructure/ui-tabs'
import { Text } from '@instructure/ui-text'
import { TextArea } from '@instructure/ui-text-area'
import { TextInput } from '@instructure/ui-text-input'
import { TimeSelect } from '@instructure/ui-time-select'
import { ToggleDetails, ToggleGroup } from '@instructure/ui-toggle-details'
import { Tooltip } from '@instructure/ui-tooltip'
import { TruncateText } from '@instructure/ui-truncate-text'
import { TreeBrowser } from '@instructure/ui-tree-browser'
import { ContextView, View } from '@instructure/ui-view'
import {Tray} from '@instructure/ui-tray'
import {Selectable} from '@instructure/ui-selectable'
import NavExample from './nav'
import CalExample from './calendar'

const CodeEditorExample = dynamic(() => {
  return import('./code_editor_example')
}, {ssr: false})
class EditableExample extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      mode: props.mode || 'view',
      value: props.value || '',
      buttonHasFocus: false,
      readOnly: false
    }
    this.onFocusEditButton = null;
  }

  renderButton ({ isVisible, onClick, onFocus, onBlur, buttonRef }) {
    if(this.state.readOnly) {
      return null
    }

     // To correctly handle focus, always return the Button, but
     // only visible if isVisible (if you want the UI to work in the standard way)
    return (
      <span style={{opacity: isVisible ? 1 : 0}}>
        <Button
          size="small"
          margin="0 0 0 x-small"
          onClick={onClick}
          onFocus={onFocus}
          onBlur={onBlur}
          elementRef={buttonRef}
        >
          Do it!
        </Button>
      </span>
    )
  }

  renderViewer () {
    return <span>{this.state.value}</span>
  }

  handleValueChange = (event) => {
    this.setState({value: event.target.value})
  }

  handleModeChange = (newMode) => {
    this.setState({mode: newMode})
  }

  renderEditor ({ onBlur, editorRef }) {
    return (
      <input
        ref={editorRef}
        onBlur={onBlur}
        value={this.state.value}
        onChange={this.handleValueChange}
      />
    )
  }

  renderMe = ({mode, getContainerProps, getViewerProps, getEditorProps, getEditButtonProps}) => {
    return (
      <View
        {...getContainerProps()}
      >
        {mode === 'view' ? this.renderViewer(getViewerProps()) : null}
        {mode === 'edit' ? this.renderEditor(getEditorProps()): null}
        {this.renderButton(getEditButtonProps())}
      </View>
    )
  }

  onChangeReadOnly = (event) => {
    this.setState({readOnly: event.target.checked})
  }

  render () {
    return  (
      <View as="div">
        <View as="div" margin="0 0 small 0">
          <Checkbox size="small" label="Read Only" checked={this.state.readOnly} onChange={this.onChangeReadOnly}/>
        </View>
        <Editable
          mode={this.state.mode}
          onChangeMode={this.handleModeChange}
          render={this.renderMe}
          value={this.state.value}
          readOnly={this.state.readOnly}
        />
      </View>
    )
  }

}
const FormFieldExample = (props) => {
  return (
    <FormField id="foo" label="Opacity" width="200px" {...props}>
  <input style={{display: 'block', width: '100%'}}/>
</FormField>
  )
}
class InplaceEditExample extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      mode: props.mode || 'view',
      value: 'This is some text',
      inline: true
    }
  }

  // You must provide this to Editable to be
  // notified of mode changes
  handleChangeMode = (mode) => {
    this.setState({mode})
  }

  // You attach an event handler to your edit component
  // to be notified of value changes from user interactions
  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  // Renders the view component
  // Be sure to give it the current value
  renderView = () => (
    <Text
      color={this.state.value ? 'primary' : 'secondary'}
      weight={this.state.value ? 'normal' : 'light'}
      size="large"
    >
      {this.state.value || 'Enter some text'}
    </Text>
  )

  // Renders the edit component.
  // You have to forward the props on, which
  // includes an onBlur property to help manage
  // the mode changes.
  // Be sure to give it the current value
  renderEdit = ({onBlur, editorRef}) => (
    <Text
      color="primary"
      size="large"
      as="input"
      type="text"
      value={this.state.value}
      onChange={this.handleChange}
      aria-label="The title"
      onBlur={onBlur}
      elementRef={editorRef}
    />
  )

  // Renders the edit button.
  // Leverage the default implementation provided by InPlaceEdit
  renderEditButton = (props) => {
    props.label = `Edit title "${this.state.value}"`
    return InPlaceEdit.renderDefaultEditButton(props)
  }

  onChangeLayout = (event) => {
    this.setState({inline: event.target.checked})
  }

  render () {
    return (
      <View as="div">
        <InPlaceEdit
          renderViewer={this.renderView}
          renderEditor={this.renderEdit}
          renderEditButton={this.renderEditButton}
          onChangeMode={this.handleChangeMode}
          mode={this.state.mode}
          value={this.state.value}
          inline={this.state.inline}
        />
        <View as="div" margin="small 0">
          <Checkbox label="inline" checked={this.state.inline} onChange={this.onChangeLayout} />
        </View>
      </View>
    )
  }
}
class ModalExample extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }
  }

  handleButtonClick = () => {
    this.setState(function (state) {
      return { open: !state.open }
    })
  };

  handleFormSubmit = e => {
    e.preventDefault()
    console.log('form submitted')
    this.setState(state => ({ open: false }))
  }

  renderCloseButton () {
    return (
      <CloseButton
        placement="end"
        offset="small"
        onClick={this.handleButtonClick}
        screenReaderLabel="Close"
      />
    )
  }

  render () {
    return (
      <div style={{ padding: '0 0 11rem 0', margin: '0 auto' }}>
        <Button onClick={this.handleButtonClick}>
          {this.state.open ? 'Close' : 'Open'} the Modal
        </Button>
        <Modal
          as="form"
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          onSubmit={this.handleFormSubmit}
          size="auto"
          label="Modal Dialog: Hello World"
          shouldCloseOnDocumentClick
        >
          <Modal.Header>
            {this.renderCloseButton()}
            <Heading>Hello World</Heading>
          </Modal.Header>
          <Modal.Body>
            <TextInput renderLabel="Example" placeholder="if you hit enter here, it should submit the form" />
            <Text lineHeight="double">fadsfasfdfsf asfasfsdf</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleButtonClick} margin="0 x-small 0 0">Close</Button>
            <Button color="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

class OverlayExample extends React.Component {
  state = {
    open: false
  }

  _mask = null

  handleMaskRef = el => {
    this._mask = el
  }

  render () {
    return (
      <div>
        <Button onClick={() => { this.setState({ open: true })}}>
          Show the Overlay
        </Button>
        <Overlay
          open={this.state.open}
          transition="fade"
          label="Overlay Example"
          shouldReturnFocus
          shouldContainFocus
          onDismiss={() => { this.setState({ open: false })}}
          defaultFocusElement={() => this._mask}
        >
          <Mask
            onClick={() => { this.setState({ open: false })}}
            elementRef={this.handleMaskRef}
          >
            <Spinner renderTitle="Loading" size="large" margin="0 0 0 medium" />
          </Mask>
        </Overlay>
      </div>
    )
  }
}

class CustomSelect extends React.Component {
  state = {
    isShowingOptions: false,
    highlightedOptionId: this.props.options[0].id,
    selectedOptionId: this.props.options[0].id,
    inputValue: this.props.options[0].label,
    filteredOptions: this.props.options
  }

  filterOptions = (value) => {
    return this.props.options.filter(option => (
      option.label.toLowerCase().startsWith(value.toLowerCase())
    ))
  }

  matchValue () {
    const { filteredOptions, inputValue, selectedOptionId } = this.state
    if (filteredOptions.length === 1) {
      if (filteredOptions[0].label.toLowerCase() === inputValue.toLowerCase()) {
        return {
          inputValue: filteredOptions[0].label,
          selectedOptionId: filteredOptions[0].id
        }
      }
    }
    const index = this.getOptionIndex(null, selectedOptionId, this.props.options)
    return { inputValue: this.props.options[index].label }
  }

  getInputStyles () {
    return {
      display: 'block',
      width: '250px',
      padding: '5px'
    }
  }

  getListStyles () {
    const { isShowingOptions } = this.state
    return {
      background: 'white',
      listStyle: 'none',
      padding: 0,
      margin: 0,
      border: isShowingOptions && 'solid 1px lightgray'
    }
  }

  getOptionStyles (option) {
    const { selectedOptionId, highlightedOptionId } = this.state
    const selected = selectedOptionId === option.id
    const highlighted = highlightedOptionId === option.id
    let background = 'transparent'
    if (selected) {
      background = 'lightgray'
    } else if (highlighted) {
      background = '#eeeeee'
    }
    return {
      background,
      padding: '0 10px'
    }
  }

  getOptionIndex (direction, id, from) {
    const { filteredOptions, highlightedOptionId } = this.state
    const options = from ? from : filteredOptions
    let index

    for (let i = 0; i <= options.length - 1; i++) {
      if (typeof id === 'undefined') {
        if (highlightedOptionId === options[i].id) {
          index = i + direction
          if (index < 0) {
            index = 0
          } else if (index >= options.length - 1) {
            index = options.length - 1
          }
          break
        }
      } else {
        if (id === options[i].id) {
          index = i
          break
        }
      }
    }
    return index
  }

  getHandlers () {
    return this.props.isDisabled ? {} : {
      onRequestShowOptions: (e) => this.setState(state => ({
        isShowingOptions: true,
        highlightedOptionId: state.filteredOptions[0].id
      })),
      onRequestHideOptions: (e) => {
        const index = this.getOptionIndex(null, this.state.selectedOptionId, this.props.options)
        this.setState(state => ({
          isShowingOptions: false,
          inputValue: this.props.options[index].label,
          filteredOptions: this.props.options,
          highlightedOptionId: null,
        }))
      },
      onRequestHighlightOption: (e, { id, direction }) => {
        let index = this.getOptionIndex(direction, id)
        this.setState(state => ({
          highlightedOptionId: state.filteredOptions[index] ? state.filteredOptions[index].id : null,
          inputValue: direction && state.filteredOptions[index]
            ? state.filteredOptions[index].label
            : state.inputValue
        }))
      },
      onRequestSelectOption: (e, { id }) => {
        const index = this.getOptionIndex(null, id)
        this.setState(state => ({
          selectedOptionId: id,
          inputValue: state.filteredOptions[index].label,
          filteredOptions: this.props.options,
          isShowingOptions: false,
          highlightedOptionId: null,
        }))
      }
    }
  }

  render () {
    const {
      isShowingOptions,
      inputValue,
      highlightedOptionId,
      selectedOptionId,
      filteredOptions
    } = this.state

    return (
      <Selectable
        isShowingOptions={isShowingOptions}
        highlightedOptionId={highlightedOptionId}
        selectedOptionId={selectedOptionId ? selectedOptionId : null}
        {...this.getHandlers()}
      >
        {({
          getRootProps,
          getLabelProps,
          getInputProps,
          getTriggerProps,
          getListProps,
          getOptionProps
        }) => (
          <span
            style={{display: 'inline-block'}}
            {...getRootProps({ref: (el) => this.rootRef = el})}
          >
            <label {...getLabelProps()}>Selectable Example</label>
            <input
              style={this.getInputStyles()}
              {...getInputProps()}
              {...getTriggerProps({
                type: 'text',
                value: inputValue,
                onChange: (e) => {
                  const newOptions = this.filterOptions(e.target.value)
                  this.setState({
                    inputValue: e.target.value,
                    filteredOptions: newOptions,
                    isShowingOptions: true,
                    highlightedOptionId: newOptions[0] ? newOptions[0].id : null
                  })
                },
                onBlur: (e) => this.setState({
                  filteredOptions: this.props.options,
                  highlightedOptionId: null,
                  isShowingOptions: false,
                  ...this.matchValue()
                })
              })
            } />
            <ul
              style={this.getListStyles()}
              {...getListProps()}
            >
              {isShowingOptions && filteredOptions.map((option) => (
                <li
                  key={option.id}
                  style={this.getOptionStyles(option)}
                  {...getOptionProps({ id: option.id })}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </span>
        )}
      </Selectable>
    )
  }
}


const AlertExample = (props) => {
  return (
    <Alert
      variant="info"
      liveRegionPoliteness="polite"
      isLiveRegionAtomic={false}
      screenReaderOnly={false}
      transition="none"
      open={false}
      hasShadow={false}
      {...props}
    ></Alert>
  )
}
const AvatarExample = () => {
  return (
    <Avatar
      size="auto"
      color="default"
      hasInverseColor={false}
      shape="circle"
      display="inline-block"
      name="test"
    ></Avatar>
  )
}
const BadgeExample = () => {
  return (
    <Badge
      type="count"
      standalone={false}
      pulse={false}
      variant="primary"
    ></Badge>
  )
}
const BillboardExample = () => {
  return (
    <Billboard
      size="small"
      headingAs="h1"
      headingLevel="h1"
      disabled={false}
      readOnly={false}
    ></Billboard>
  )
}
const BreadcrumbExample = (props) => {
  return <Breadcrumb size="small" {...props}></Breadcrumb>

}
const ButtonExample = () => {
  return (
    <Button
      type="button"
      size="small"
      interaction="enabled"
      color="primary"
      focusColor="info"
      display="inline-block"
      textAlign="start"
      withBackground={false}
    ></Button>
  )
}
const CondensedButtonExample = () => {
  return (
    <CondensedButton
      type="button"
      size="small"
      interaction="enabled"
      color="primary"
    ></CondensedButton>
  )
}
const ToggleButtonExample = () => {
  return (
    <ToggleButton
      status="pressed"
      interaction="enabled"
      size="small"
      color="primary"
      isShowingTooltip={false}
    ></ToggleButton>
  )
}
const IconButtonExample = () => {
  return (
    <IconButton
      type="button"
      size="small"
      interaction="enabled"
      color="primary"
      focusColor="info"
      shape="rectangle"
      withBackground={false}
      withBorder={false}
    ></IconButton>
  )
}
const BylineExample = () => {
  return <Byline alignContent="top" size="small"></Byline>
}
const CalendarExample = CalExample
const CheckboxExample = () => {
  return (
    <Checkbox
      defaultChecked={false}
      disabled={false}
      readOnly={false}
      indeterminate={false}
      size="small"
      variant="simple"
      inline={false}
      labelPlacement="top"
    ></Checkbox>
  )
}
const CheckboxGroupExample = () => {
  return (
    <CheckboxGroup
      disabled={false}
      readOnly={false}
      size="small"
      layout="stacked"
    ></CheckboxGroup>
  )
}
const DateInputExample = () => {
  return (
    <DateInput
      size="small"
      interaction="enabled"
      isRequired={false}
      isInline={false}
      layout="stacked"
      display="inline-block"
      isShowingCalendar={false}
    ></DateInput>
  )
}
const DateTimeInputExample = () => {
  return (
    <DateTimeInput
      interaction="enabled"
      timeStep="5"
      layout="stacked"
      isRequired={false}
    ></DateTimeInput>
  )
}
const DrawerLayoutExample = () => {
  return <DrawerLayout ></DrawerLayout>
}
const FileDropExample = () => {
  return (
    <FileDrop
      shouldEnablePreview={false}
      shouldAllowMultiple={false}
      shouldAllowRepeats={false}
      interaction="enabled"
      display="block"
    ></FileDrop>
  )
}
const FlexExample = () => {
  return (
    <Flex
      display="flex"
      textAlign="start"
      direction="row"
      alignItems="center"
      justifyItems="center"
      wrap="wrap"
      withVisualDebug={false}
    ></Flex>
  )
}
const FormFieldGroupExample = () => {
  return (
    <FormFieldGroup
      disabled={false}
      layout="stacked"
      rowSpacing="none"
      colSpacing="none"
      vAlign="top"
      startAt="small"
    ></FormFieldGroup>
  )
}
const GridExample = () => {
  return (
    <Grid
      colSpacing="none"
      rowSpacing="none"
      hAlign="start"
      vAlign="top"
      startAt="small"
      visualDebug={false}
    ></Grid>
  )
}
const HeadingExample = () => {
  return <Heading border="none" color="primary" level="h1"></Heading>
}
const ImgExample = () => {
  return (
    <Img
      display="inline-block"
      withGrayscale={false}
      withBlur={false}
      constrain="cover"
    ></Img>
  )
}
const LinkExample = () => {
  return (
    <Link
      color="link"
      interaction="enabled"
      iconPlacement="start"
      display="auto"
      isWithinText={false}
    ></Link>
  )
}
const InlineListExample = () => {
  return (
    <InlineList
      as="ul"
      size="small"
      delimiter="none"
      itemSpacing="none"
    ></InlineList>
  )
}
const ListExample = () => {
  return (
    <List
      as="ul"
      delimiter="none"
      isUnstyled={false}
      size="small"
      itemSpacing="none"
    ></List>
  )
}
const MenuExample = () => {
  return (
    <Menu
      disabled={false}
      defaultShow={false}
      shouldHideOnSelect={false}
      shouldFocusTriggerOnClose={false}
      type="flyout"
      withArrow={false}
    ></Menu>
  )
}
const MetricExample = () => {
  return <Metric textAlign="start" isGroupChild={false}></Metric>
}
const MetricGroupExample = () => {
  return <MetricGroup></MetricGroup>
}
const AppNavExample = () => {
  return <AppNav></AppNav>
}
const NavigationExample = NavExample
  //  dynamic(() => import('./dynamic'),
  // {ssr: true})
const NumberInputExample = () => {
  return (
    <NumberInput
      interaction="enabled"
      isRequired={false}
      showArrows={false}
      size="medium"
      display="inline-block"
      inputMode="numeric"
      textAlign="start"
    ></NumberInput>
  )
}
const OptionsExample = () => {
  return <Options></Options>
}
const PaginationExample = () => {
  return (
    <Pagination
      disabled={false}
      withFirstAndLastButton={false}
      showDisabledButtons={false}
      variant="full"
      shouldHandleFocus={false}
    ></Pagination>
  )
}
const PillExample = () => {
  return <Pill color="primary"></Pill>
}
const PopoverExample = () => {
  return (
    <Popover
      isShowingContent={false}
      defaultIsShowingContent={false}
      withArrow={false}
      color="primary"
      insertAt="bottom"
      shouldAlignArrow={false}
      shouldTrackPosition={false}
      shouldRenderOffscreen={false}
      shouldContainFocus={false}
      shouldReturnFocus={false}
      shouldCloseOnDocumentClick={false}
      shouldCloseOnEscape={false}
      shouldFocusContentOnTriggerBlur={false}
    ></Popover>
  )
}
const PositionExample = () => {
  return (
    <Position
      placement="top"
      insertAt="bottom"
      shouldTrackPosition={false}
      shouldPositionOverTarget={false}
    ></Position>
  )
}
const ProgressBarExample = () => {
  return <ProgressBar size="x-small" color="primary"></ProgressBar>
}
const ProgressCircleExample = () => {
  return (
    <ProgressCircle
      size="x-small"
      color="primary"
      shouldAnimateOnMount={false}
    ></ProgressCircle>
  )
}
const RadioInputExample = () => {
  return (
    <RadioInput
      checked={false}
      disabled={false}
      readOnly={false}
      variant="simple"
      size="small"
      context="success"
      inline={false}
    ></RadioInput>
  )
}
const RadioInputGroupExample = () => {
  return (
    <RadioInputGroup
      disabled={false}
      readOnly={false}
      variant="simple"
      size="small"
      layout="stacked"
    ></RadioInputGroup>
  )
}
const RangeInputExample = () => {
  return (
    <RangeInput
      size="small"
      layout="stacked"
      displayValue={false}
      inline={false}
      disabled={false}
      readOnly={false}
    ></RangeInput>
  )
}
const RatingExample = () => {
  return <Rating iconCount="3" size="small" animateFill={false}></Rating>
}
const SelectExample = () => {
  return (
    <Select
      size="small"
      interaction="enabled"
      isRequired={false}
      isInline={false}
      isShowingOptions={false}
      shouldNotWrap={false}
    ></Select>
  )
}
const SimpleSelectExample = () => {
  return (
    <SimpleSelect
      size="small"
      interaction="enabled"
      isRequired={false}
      isInline={false}
    ></SimpleSelect>
  )
}
const SpinnerExample = () => {
  return <Spinner size="x-small" variant="default"></Spinner>
}
const InlineSVGExample = () => {
  return (
    <InlineSVG focusable={false} inline={false} color="inherit"></InlineSVG>
  )
}
const SVGIconExample = () => {
  return (
    <SVGIcon
      focusable={false}
      inline={false}
      color="inherit"
      rotate="0"
      size="x-small"
      bidirectional={false}
    ></SVGIcon>
  )
}
const TableExample = () => {
  return <Table hover={false} layout="auto"></Table>
}
const TagExample = () => {
  return (
    <Tag
      disabled={false}
      readOnly={false}
      dismissible={false}
      size="small"
      variant="default"
    ></Tag>
  )
}
const TabsExample = () => {
  return (
    <Tabs
      variant="default"
      textAlign="start"
      tabOverflow="stack"
      shouldFocusOnRender={false}
    ></Tabs>
  )
}
const TextExample = () => {
  return (
    <Text
      fontStyle="italic"
      letterSpacing="normal"
      lineHeight="default"
      size="x-small"
      transform="none"
      weight="normal"
      wrap="normal"
    ></Text>
  )
}
const TextAreaExample = () => {
  return (
    <TextArea
      size="small"
      layout="stacked"
      autoGrow={false}
      resize="none"
      inline={false}
      disabled={false}
      readOnly={false}
      required={false}
    ></TextArea>
  )
}
const TextInputExample = () => {
  return (
    <TextInput
      type="text"
      interaction="enabled"
      size="small"
      textAlign="start"
      display="inline-block"
      shouldNotWrap={false}
      isRequired={false}
    ></TextInput>
  )
}
const TimeSelectExample = () => {
  return (
    <TimeSelect
      defaultToFirstOption={false}
      step="5"
      interaction="enabled"
      isRequired={false}
      isInline={false}
    ></TimeSelect>
  )
}
const ToggleDetailsExample = () => {
  return (
    <ToggleDetails
      variant="default"
      defaultExpanded={false}
      iconPosition="start"
      fluidWidth={false}
      size="small"
    ></ToggleDetails>
  )
}
const ToggleGroupExample = () => {
  return (
    <ToggleGroup
      size="small"
      defaultExpanded={false}
      transition={false}
      border={false}
    ></ToggleGroup>
  )
}
const TooltipExample = () => {
  return (
    <Tooltip
      isShowingContent={false}
      defaultIsShowingContent={false}
      color="primary"
    ></Tooltip>
  )
}
const TruncateTextExample = () => {
  return (
    <TruncateText
      position="end"
      truncate="character"
      shouldTruncateWhenInvisible={false}
    ></TruncateText>
  )
}
const TreeBrowserExample = () => {
  return (
    <TreeBrowser
      selectionType="none"
      size="small"
      variant="folderTree"
      showRootCollection={false}
      collections={{
        1: {
          id: 1,
          name: "Assignments",
          collections: [2,3],
          items: [3],
          descriptor: "Class Assignments"
        },
        2: { id: 2, name: "English Assignments", collections: [], items: [] },
        3: { id: 3, name: "Math Assignments", collections: [], items: [1,2] }
      }}
      items={{
        1: { id: 1, name: "Addition Worksheet" },
        2: { id: 2, name: "Subtraction Worksheet" },
        3: { id: 3, name: "General Questions" },
        4: { id: 4, name: "Vogon Poetry" },
        5: { id: 5, name: "Bistromath", descriptor: "Explain the Bistromathic Drive" }
      }}
    ></TreeBrowser>
  )
}
const ContextViewExample = () => {
  return (
    <ContextView
      textAlign="start"
      background="default"
      debug={false}
    ></ContextView>
  )
}
const ViewExample = () => {
  return (
    <View
      display="auto"
      overflowX="auto"
      overflowY="auto"
      textAlign="start"
      borderColor="transparent"
      background="transparent"
      position="static"
      withFocusOutline={false}
      focusPosition="offset"
      focusColor="info"
      shouldAnimateFocus={false}
      withVisualDebug={false}
    ></View>
  )
}
class TrayExample extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  hideTray = () => {
    this.setState({
      open: false
    })
  }

  renderCloseButton () {
    return (
      <Flex>
        <Flex.Item shouldGrow shouldShrink>
          <Heading>Hello</Heading>
        </Flex.Item>
        <Flex.Item>
          <CloseButton
            placement="end"
            offset="small"
            screenReaderLabel="Close"
            onClick={this.hideTray}
          />
        </Flex.Item>
      </Flex>
    )
  }

  render () {
    return (
      <div style={{ padding: '0 0 16rem 0', margin: '0 auto' }}>
        <Button
          onClick={() => { this.setState({ open: true }) }}
          ref={(c) => this._showButton = c}
        >
          Show the Tray
        </Button>
        <Tray
          label="Tray Example"
          open={this.state.open}
          onDismiss={() => { this.setState({ open: false }) }}
          size="small"
          placement="start"
        >
          <View as="div" padding="medium">
            {this.renderCloseButton()}
            <Text as="p" lineHeight="double">fasdfasfsdfsdfdsaf ffasdfasdfsdf</Text>
          </View>
        </Tray>
      </div>
    )
  }
}
const ResponsiveExample = () => {

  return (
    <Responsive
  match="media"
  query={{
    small: { maxWidth: 600 },
    medium: { minWidth: 600 },
    large: { minWidth: 800}
  }}
>
  {(props, matches) => {
    if (matches.includes('large')) {
      return (
        <Billboard
          message="Large breakpoint"
          hero={<IconUserLine />}
        />
      )
    } else if (matches.includes('medium') && !matches.includes('large')) {
      return (
        <Byline description="Medium breakpoint">
          <Avatar name="Alexander Hamilton" />
        </Byline>
      )
    } else {
      return (
        <Pill color="primary">
          Small breakpoint
        </Pill>
      )
    }
  }}
</Responsive>
  )
}

export const ExampleRenderer = () => {
  return (
    <>
      <AlertExample />
      <AvatarExample />
      <BadgeExample />
      <BillboardExample />
      <BreadcrumbExample label="hello"/>
      <ButtonExample />
      <CondensedButtonExample />
      <ToggleButtonExample />
      <IconButtonExample />
      <BylineExample />
      <CalendarExample />
      <CheckboxExample />
      <CheckboxGroupExample />
      <DateInputExample />
      <DateTimeInputExample />
      <DrawerLayoutExample />
      <FileDropExample />
      <FlexExample />
      <FormFieldGroupExample />
      <GridExample />
      <HeadingExample />
      <ImgExample />
      <LinkExample />
      <InlineListExample />
      <ListExample />
      <MenuExample />
      <MetricExample />
      <MetricGroupExample />
      <AppNavExample />
      <NavigationExample />
      <NumberInputExample />
      <OptionsExample />
      <PaginationExample />
      <PillExample />
      <PopoverExample />
      <PositionExample />
      <ProgressBarExample />
      <ProgressCircleExample />
      <RadioInputExample />
      <RadioInputGroupExample />
      <RangeInputExample />
      <RatingExample />
      <SelectExample />
      <SimpleSelectExample />
      <SpinnerExample />
      <InlineSVGExample />
      <SVGIconExample />
      <TableExample />
      <TagExample />
      <TabsExample />
      <TextExample />
      <TextAreaExample />
      <TextInputExample />
      <TimeSelectExample />
      <ToggleDetailsExample />
      <ToggleGroupExample />
      <TooltipExample />
      <TruncateTextExample />
      <TreeBrowserExample />
      <ContextViewExample />
      <ViewExample />
      <TrayExample ></TrayExample>
      <CustomSelect options={[
          { id: 'opt0', value: '0', label: 'Alabama' },
          { id: 'opt1', value: '1', label: 'Alaska' },
          { id: 'opt2', value: '2', label: 'American Samoa' },
          { id: 'opt3', value: '3', label: 'Arizona' },
          { id: 'opt4', value: '4', label: 'Arkansas' }
      ]} />
      <ResponsiveExample />
      <OverlayExample ></OverlayExample>
      <ModalExample ></ModalExample>
      <InplaceEditExample />
      <FormFieldExample />
      <EditableExample />
      <CodeEditorExample />
    </>
  )
}