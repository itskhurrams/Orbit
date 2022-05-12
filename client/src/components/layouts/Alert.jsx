import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Alert = ({ alertList }) =>
  alertList !== null &&
  alertList.length > 0 &&
  alertList.map((alert) => (
    <div
      key={alert.id}
      className={`text-white px-6 py-4 border-0 rounded relative mb-4 bg-${alert.alertType}-500`}
    >
      <span className='text-xl inline-block px-2 align-middle'>
        <i className='fas fa-bell' />
      </span>
      <span className='inline-block align-middle mr-8'>
        <b className='capitalize'></b> {alert.msg}
      </span>
    </div>
  ));

Alert.propTypes = {
  alertList: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  alertList: state.alert,
});
export default connect(mapStateToProps)(Alert);
