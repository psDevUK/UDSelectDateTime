import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class UDSelectDateTime extends React.Component {

  // state is for keeping control state before or after changes.
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      startDate: new Date(),
      hidden: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.pubSubToken = PubSub.subscribe(this.props.id, this.onIncomingEvent.bind(this));
  }

  componentWillUnmount() {
    PubSub.unsubscribe(this.pubSubToken);
  }

  onIncomingEvent(eventName, event) {
    if (event.type === "requestState") {
      var data = {
        attributes: {
          startDate: this.state.startDate,
          hidden: this.state.hidden,
        }
      }
      UniversalDashboard.post(`/api/internal/component/element/sessionState/${event.requestId}`, data);
    }
    else if (event.type === "setState") {
      this.setState(event.state.attributes);
    }
    else if (event.type === "clearElement") {
      this.setState({
        startDate: null
      });
    }
    else if (event.type === "removeElement") {
      this.setState({
        hidden: true
      });
    }
  }

  onChanged(e) {

    this.setState({
      value: e,
      startDate: e
    });

    if (this.props.onChange == null) {
      return
    }

    var val = e;

    UniversalDashboard.publish('element-event', {
      type: "clientEvent",
      eventId: this.props.id + "onChange",
      eventName: 'onChange',
      eventData: val.toString()
    });
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  render() {
    if (this.state.hidden) {
      return null;
    }
    const { startDate, setStartDate } = this.state;
    return (
      <DatePicker
        id={this.props.id}
        todayButton="Today"
        locale={this.props.locale}
        selected={this.state.startDate}
        onChange={this.onChanged.bind(this)}
        showTimeSelect={this.props.showTimeSelect}
        timeFormat={this.props.timeFormat}
        timeIntervals={this.props.timeIntervals}
        timeCaption="Time"
        dateFormat={this.props.dateFormat}
        showWeekNumbers={this.props.showWeekNumbers}
        isClearable={this.props.isClearable}
        withPortal={this.props.withPortal}
        showPreviousMonths={this.props.showPreviousMonths}
        monthsShown={this.props.monthsShown}
      />
    )

  }
}

export default UDSelectDateTime
