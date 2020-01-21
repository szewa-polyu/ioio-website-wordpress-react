import React, {useState, useEffect , useRef} from 'react';
import {Link} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

import routes from 'globals/routes';
import {invokeIfIsFunction} from 'utils/js/function/isFunction';

import './WorkWorkLabSwitch.css';

export default function WorkWorkLabSwitch(props) {
  const showTimeoutInMillis = 1500;
  
  const {
    onClick, backgroundColor, color
  } = props;

  const onClickFunc = _ => {
    invokeIfIsFunction(onClick);
  };

  const [isShow, setIsShow] = useState(false);
  const workToLabSwitchRef = useRef(null);

  useEffect (_ => {
    function handleWindowScroll(event) {
      const bufferPercentage = 0.1;
      const threshold = bufferPercentage * (window.innerHeight || document.documentElement.clientHeight);
      const positionBottom = workToLabSwitchRef.current.getBoundingClientRect().bottom;      
      if (isShow) {
        const isMovingOut = (positionBottom < (0 + threshold));
        if (isMovingOut) {
          setIsShow(false);
        }
      }

      if (!isShow) {
        const isMovingIn = (positionBottom >= (0 + threshold));
        if (isMovingIn) {
          setIsShow(true);
        }
      }
    }

    setTimeout(_ => {
      setIsShow(true);
    }, showTimeoutInMillis);

    window.addEventListener('scroll', handleWindowScroll);
    return function cleanup() {
      window.removeEventListener('scroll', handleWindowScroll);
    }
  });

  const circleStyle = {
    backgroundColor: backgroundColor || 'black'
  };

  const textStyle = {
    color: color || 'white'
  }

  return (
    <div 
      ref={workToLabSwitchRef}
      className={`work-to-lab-switch ${isShow ? "show" : "hide"}`}
    >
      <Link 
        role="button"
        to={routes.lab(true)}
        onClick={onClickFunc}
      >
        <div className='circle' style={circleStyle}>
          <div className='text' style={textStyle}>
            <FormattedMessage
              id="WorkWorkLabSwitch.switchDestination"
              defaultMessage="Lab!"
            />         
          </div>
        </div>
      </Link>
    </div>
  );
}
