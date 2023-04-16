/**
 * This file was generated from RangeSlider.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export type EditableEnum = "default" | "never";

export interface RangeSliderProps<Style> {
    name: string;
    style: Style[];
    lowerValueAttribute: EditableValue<Big>;
    upperValueAttribute: EditableValue<Big>;
    editable: EditableEnum;
    minimumValue: DynamicValue<Big>;
    maximumValue: DynamicValue<Big>;
    stepSize: DynamicValue<Big>;
    onChange?: ActionValue;
    useCustomMarkers: boolean;
    lowMarker?: ReactNode;
    highMarker?: ReactNode;
}

export interface RangeSliderPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    lowerValueAttribute: string;
    upperValueAttribute: string;
    editable: EditableEnum;
    minimumValue: string;
    maximumValue: string;
    stepSize: string;
    onChange: {} | null;
    useCustomMarkers: boolean;
    lowMarker: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    highMarker: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
}
