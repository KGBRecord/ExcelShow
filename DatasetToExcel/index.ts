// index.ts
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";
import { ComponentRenderer, IMakerStyleProps, IDatasetToExcelProps } from "./ComponentRenderer";

export class ExcelShow implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;

    constructor() { }

    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        context.mode.trackContainerResize(true);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const stylesProps: IMakerStyleProps = {
            textColor: "black",
            bgColor: "white",
            iconColor: "inherit",
            hoverTextColor: "black",
            hoverBgColor: "white",
            borderColor: "gray",
            borderHoverColor: "black",
            borderWidth: 1,
            borderRadius: 2,
            buttonWidth: context.mode.allocatedWidth,
            buttonHeight: context.mode.allocatedHeight
        };

        let excelRows = context.parameters.ExcelRows;
        const props: IDatasetToExcelProps = {
            makerStyleProps: stylesProps,
            excelRows: excelRows,
            isLoading: context.parameters.Loading.raw! || false
        };

        return React.createElement(ComponentRenderer, props);
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void { }
}