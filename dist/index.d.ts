/**
 * @class JSGanttComponent
 */
import * as React from 'react';
import './styles.scss';
export declare type Props = {
    data: Array<any>;
    options: Object;
};
export default class JSGanttComponent extends React.Component<Props> {
    id: string;
    editor: any;
    options: any;
    optionsChanged: boolean;
    componentDidMount(): void;
    componentDidUpdate(): void;
    makeChart(): void;
    render(): JSX.Element;
}
