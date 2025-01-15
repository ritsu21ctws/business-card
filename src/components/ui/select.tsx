'use client';

import type { CollectionItem, SelectItemProps, SelectClearTriggerProps } from '@chakra-ui/react';
import { Select as ChakraSelect, Portal } from '@chakra-ui/react';
import { CloseButton } from './close-button';
import * as React from 'react';

interface SelectTriggerProps extends ChakraSelect.ControlProps {
  clearable?: boolean;
  children?: React.ReactNode;
}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(function SelectTrigger(props, ref) {
  const { children, clearable, ...rest } = props;

  const chakraSelectTriggerProps = {
    children,
  };

  return (
    <ChakraSelect.Control {...rest}>
      <ChakraSelect.Trigger ref={ref} {...chakraSelectTriggerProps} />
      <ChakraSelect.IndicatorGroup>
        {clearable && <SelectClearTrigger />}
        <ChakraSelect.Indicator />
      </ChakraSelect.IndicatorGroup>
    </ChakraSelect.Control>
  );
});

const SelectClearTrigger = React.forwardRef<HTMLButtonElement, ChakraSelect.ClearTriggerProps>(function SelectClearTrigger(props, ref) {
  const chakraSelectClearTriggerProps: SelectClearTriggerProps = {
    asChild: true,
    children: <CloseButton size="xs" variant="plain" focusVisibleRing="inside" focusRingWidth="2px" pointerEvents="auto" />,
  };

  return <ChakraSelect.ClearTrigger {...props} ref={ref} {...chakraSelectClearTriggerProps} />;
});

interface SelectContentProps extends ChakraSelect.ContentProps {
  portalled?: boolean;
  portalRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(function SelectContent(props, ref) {
  const { portalled = true, portalRef, ...rest } = props;
  return (
    <Portal disabled={!portalled} container={portalRef}>
      <ChakraSelect.Positioner>
        <ChakraSelect.Content {...rest} ref={ref} />
      </ChakraSelect.Positioner>
    </Portal>
  );
});

interface NewSelectItemProps extends SelectItemProps {
  children?: React.ReactNode;
  item: CollectionItem;
  key?: string;
}

export const SelectItem = React.forwardRef<HTMLDivElement, NewSelectItemProps>(function SelectItem(props, ref) {
  const { item, children, ...rest } = props;

  const chakraSelectItemProps: SelectItemProps = {
    item,
    children: (
      <>
        {children}
        <ChakraSelect.ItemIndicator />
      </>
    ),
  };

  return <ChakraSelect.Item key={item.value} {...rest} ref={ref} {...chakraSelectItemProps} />;
});

interface SelectValueTextProps extends Omit<ChakraSelect.ValueTextProps, 'children'> {
  children?(items: CollectionItem[]): React.ReactNode;
  placeholder: string;
}

export const SelectValueText = React.forwardRef<HTMLSpanElement, SelectValueTextProps>(function SelectValueText(props, ref) {
  const { children, ...rest } = props;
  const chakraSelectValueTextProps = {
    children: (
      <ChakraSelect.Context>
        {(select) => {
          const items = select.selectedItems;
          if (items.length === 0) return props.placeholder;
          if (children) return children(items);
          if (items.length === 1) return select.collection.stringifyItem(items[0]);
          return `${items.length} selected`;
        }}
      </ChakraSelect.Context>
    ),
  };
  return <ChakraSelect.ValueText {...rest} ref={ref} {...chakraSelectValueTextProps} />;
});

export const SelectRoot = React.forwardRef<HTMLDivElement, ChakraSelect.RootProps>(function SelectRoot(props, ref) {
  return (
    <ChakraSelect.Root {...props} ref={ref} positioning={{ sameWidth: true, ...props.positioning }}>
      {props.asChild ? (
        props.children
      ) : (
        <>
          <ChakraSelect.HiddenSelect />
          {props.children}
        </>
      )}
    </ChakraSelect.Root>
  );
}) as ChakraSelect.RootComponent;

interface SelectItemGroupProps extends ChakraSelect.ItemGroupProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

export const SelectItemGroup = React.forwardRef<HTMLDivElement, SelectItemGroupProps>(function SelectItemGroup(props, ref) {
  const { children, label, ...rest } = props;
  const chakraSelectItemGroupProps = {
    children: (
      <>
        <ChakraSelect.ItemGroupLabel>{label}</ChakraSelect.ItemGroupLabel>
        {children}
      </>
    ),
  };
  return <ChakraSelect.ItemGroup {...rest} ref={ref} {...chakraSelectItemGroupProps} />;
});

export const SelectLabel = ChakraSelect.Label;
export const SelectItemText = ChakraSelect.ItemText;
