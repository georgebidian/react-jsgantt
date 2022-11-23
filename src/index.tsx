/**
 * @class JSGanttComponent
 */
import React from 'react';
import * as JSGantt from 'jsgantt-improved';
import './styles.scss';

export type Props = {
  data: Array<any>,
  options: Object;
  onMakeChart?: (editor: any, taskItemObjects: any[]) => void;
};

export default class JSGanttComponent extends React.PureComponent<Props> {
  public id = 'reactgantteditor' + (Math.floor(Math.random() * 1000000) + '-');
  public editor: any;
  public options: any;
  public optionsChanged = false;

  componentDidMount() {
    this.makeChart();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.data !== prevProps.data || this.props.options !== prevProps.options) {
      this.makeChart();
    }
  }

  makeChart() {
    const jsantt: any = JSGantt;
    const { GanttChart } = jsantt.default;
    const g = this.editor = new GanttChart(document.getElementById(this.id), 'week');
    let optionsBefore = this.options || this.props.options;

    if (!this.optionsChanged && this.editor?.options) {
      optionsBefore = this.editor.options;
    }

    if (g.getDivId() != null) {
      g.setOptions({
        vCaptionType: 'Complete',  // Set to Show Caption : None,Caption,Resource,Duration,Complete,
        vQuarterColWidth: 36,
        vDateTaskDisplayFormat: 'day dd month yyyy', // Shown in tool tip box
        vDayMajorDateDisplayFormat: 'mon yyyy - Week ww', // Set format to display dates in the "Major" header of the "Day" view
        vWeekMinorDateDisplayFormat: 'dd mon', // Set format to display dates in the "Minor" header of the "Week" view
        vShowTaskInfoLink: 1, // Show link in tool tip (0/1)
        vShowEndWeekDate: 0,  // Show/Hide the date for the last day of the week in header for
        vUseSingleCell: 10000,
        //vDebug: true,
        // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers
        vFormatArr: ['Day', 'Week', 'Month', 'Quarter'],
        ...optionsBefore
      });

      const { data } = this.props;
      const taskItemObjects = data?.map((row: any) => {
        row.pGantt = g;
        return g.AddTaskItemObject(row);
      });

      g.Draw();

      if (this.props?.onMakeChart) {
        this.props.onMakeChart(this.editor, taskItemObjects);
      }
    }
  }

  render() {
    return <div id={this.id} className="gantt" />;
  }
}
