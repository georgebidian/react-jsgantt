/**
 * @class JSGanttComponent
 */
import React from 'react';
import './styles.scss';
export declare type Props = {
    data: Array<any>;
    options: Object;
    onMakeChart?: (editor: any, taskItemObjects: any[]) => void;
};
export default class JSGanttComponent extends React.PureComponent<Props> {
    id: string;
    editor: any;
    options: any;
    optionsChanged: boolean;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    makeChart(): void;
    render(): JSX.Element;
}
